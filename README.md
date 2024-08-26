# Gerenciamento de Corridas

Este projeto é uma aplicação web para gerenciar corridas de rua. Ele permite que os usuários adicionem e removam corridas, armazenando os dados localmente no navegador usando `localStorage`. Permite também que o usuário veja suas métrica

## Tecnologias Utilizadas

- **TypeScript**: Para tipagem estática e desenvolvimento mais seguro.
- **HTML/CSS**: Para a estrutura e estilo da interface do usuário.
- **Webpack**: Para bundling e gerenciamento dos assets.
- **Yarn**: Gerenciador de pacotes para o ambiente de desenvolvimento.

## Funcionalidades

- Adicionar novas corridas.
- Remover corridas.
- Listagem das corridas cadastradas.
- Armazenamento dos dados das corridas no `localStorage`.
- Cálculo de Métricas. 

## Configurando e Acessando o ambiente de desenvolvimento do Projeto
Siga as etapas abaixo para configurar o ambiente de desenvolvimento:

1. Clone o Repositório
Clone o repositório para sua máquina local:


git clone https://github.com/nidomus/restic36_projeto_1.git

cd gerenciamento-de-corridas

2. Instale as Dependências
Use o Yarn para instalar todas as dependências necessárias:

yarn install

3. Compile o Projeto
Compile o código TypeScript para JavaScript e inicie o Webpack Dev Server:

yarn dev

4. Acesse a Aplicação

Após iniciar o servidor de desenvolvimento, a aplicação estará disponível em http://localhost:9000