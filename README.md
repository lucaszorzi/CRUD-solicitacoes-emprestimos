# Projeto
    Este projeto foi desenvolvido para o teste de backend da Money Money por Lucas Zorzi.

    O backend foi desenvolvido em Node.js, usando Express e SQLite.


## Executando

    Execute `npm i` para instalar os pacotes.

    Execute `npm run dev` para rodar a aplicação.

    O servidor estará ativo através da URL `http://localhost:3000/`.


## CRUD

    Para fazer uma inserção, utilize uma requisição `POST` enviando um JSON no Body para `http://localhost:3000/add`.

    Para fazer uma listagem, utilize uma requisição `GET` para `http://localhost:3000/list`.

    Para fazer uma edição, utilize uma requisição `PUT` enviando um JSON no Body para `http://localhost:3000/edit/id`.

    Para fazer uma exclusão, utilize uma requisição `DELETE` para `http://localhost:3000/delete/id`.