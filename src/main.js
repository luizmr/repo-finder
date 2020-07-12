import api from './api';
import '../src/css/styles.css';

class App {
	constructor() {
		// array que vai guardar os repositorios do github
		this.repositories = [];

		// vai chamar o formulário e salvar na variável formEl
		this.formEl = document.getElementById('repo-form');
		this.listEl = document.getElementById('repo-list');

		this.inputEl = document.querySelector('input[name=repository]');

		// vai registrar os eventos - submit
		this.registerHandlers();
	}

	registerHandlers() {
		this.formEl.onsubmit = (event) => this.addRepository(event);
	}

	setLoading(loading = true) {
		let loadings = document.querySelector('.gradient-loader');
		let repoList = document.querySelector('#repo-list');

		if (loading === true) {
			loadings.classList.add('active');
			repoList.style.display = 'none';
		} else {
			repoList.style.display = 'block';
			loadings.classList.remove('active');
		}
	}

	//
	async addRepository() {
		// previne que ele recarregue a pagina toda vez que adicionar um repo/executar ação
		event.preventDefault();

		// pega o valor da input e salva na variavel repoInput
		const repoInput = this.inputEl.value;

		// se o tamanho da input for zero, da um return e ja para
		if (repoInput.length === 0) return;

		// antes de procurar, começa a carregar
		this.setLoading();

		try {
			// com o await, da um get com a input informada
			const response = await api.get(`/repos/${repoInput}`);

			// desestruturação para buscar as informações desejadas
			const {
				name,
				description,
				html_url,
				owner: {avatar_url},
			} = response.data;

			// adiciona na array
			this.repositories.push({
				name,
				description,
				avatar_url,
				html_url,
			});

			// apagar o que esta escrito na input quando add
			this.inputEl.value = '';

			this.render();
		} catch (err) {
			alert('O repositório não existe.');
		}

		// depois que procurou, remove
		this.setLoading(false);
	}

	render() {
		this.listEl.innerHTML = '';

		// foreach só percorre os elementos da array e nao altera
		this.repositories.forEach((repo) => {
			const id = new Date().getTime().toString();
			this.listEl.innerHTML += `<li data-id=${id}>
			<div class="image">
				<img src="${repo.avatar_url}" alt="avatar" />
			</div>
			<div class="content">
				<h3>${repo.name}</h3>
				<p>${repo.description}</p>
				
				<a href="${repo.html_url}" target="_blank">Acessar</a>	
			</div>
		</li>`;
		});
	}
}

new App();
