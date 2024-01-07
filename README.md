# bookstore-fastapi

## Configuração do ambiente virtual
- Criar um ambiente virtual para instalação de dependências:  `python3 -v venv venv_project`
- Ativar o ambiente virtual que foi criado:` source venv_project/bin/activate`

- Instalar dependências: `pip install -r requirements.txt`

## Configuração das variáveis de ambiente
- Criar um arquivo .env e adicionar os seguintes valores:

 `POSTGRES_DB=postgresdatabase`
 `POSTGRES_USER=postgresuser`
 `POSTGRES_PASSWORD=postgrespassword`
 `BOOK_API_URL=ExternalAPIURL`
 `SECRET_KEY=SECRET_KEY`
 `DOCKER_IP=127.0.0.1`

## Configuração do Alembic
- Ir até o arquivo alembic.ini e alterece a variável "sqlalchemy.url":
`sqlalchemy.url = postgresql+pg8000://postgresuser:postgrespassword@172.17.0.1/postgresdatabase`

## Docker-compose.yml
- Dentro da pasta Backend levantar o container do Banco de Dados (POSTGRESQL):      `docker compose up --build -d --remove-orphans`


## Migrações com alembic
- Usar o comando para aplicar as migrações: `alembic upgrade heads`

- Gerar uma nova migração com alembic: `alembic revision --autogenerate -m '<nome da migração>'` 

## Execução do Backend
- Entrar na pasta Backend e executar o script main.py: `python3 main.py` 


## Execução do Frontend
- Instalar dependencias:  `npm i`
- Executar: `npm run dev`