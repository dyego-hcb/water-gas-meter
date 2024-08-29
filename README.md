# Water & Gas Meter API

## Descrição do Projeto

Este projeto é uma API destinada ao gerenciamento de medição de consumo de água e gás, incluindo a coleta, armazenamento e confirmação dos dados relacionados a clientes. O objetivo é proporcionar uma solução robusta e escalável para a gestão eficiente de medições e confirmações, garantindo a integridade e a precisão dos dados.

## Estrutura do Repositório

A estrutura do repositório é organizada para garantir a clareza e a separação das diferentes fases de desenvolvimento, facilitando a manutenção e a expansão futura do projeto.

```plaintext
water-gas-meter-api/
│
├── docs/
│   ├── diagrams/
│   │   ├── conceptual/
│   │   │   └── WaterGassMeterDBConceptual.png
│   │   ├── logical/
│   │   │   └── WaterGassMeterDBLogical.png
│
├── water_gas_meter_api/
│
└── README.md
```

# Descrição dos Diretórios

## docs/diagrams/
Contém diagramas e documentos relacionados à concepção e estruturação do sistema.

- **conceptual/**: Inclui o diagrama conceitual que ilustra as entidades principais e suas relações de alto nível.
  - **WaterGassMeterDBConceptual.png**: Representa a visão abstrata do sistema, destacando as entidades e seus relacionamentos fundamentais.
  
- **logical/**: Contém o diagrama lógico, detalhando a modelagem do banco de dados e suas interdependências.
  - **WaterGassMeterDBLogical.png**: Expõe a estrutura de tabelas, chaves primárias, estrangeiras e relacionamentos no banco de dados.

## water_gas_meter_api/
Contém o código-fonte da API, incluindo a implementação dos modelos, rotas e a lógica de negócios.

- **water_gas_meter_api/src**: Contém o código-fonte da API, incluindo a implementação dos modelos, rotas e a lógica de negócios.
- **water_gas_meter_api/docker-compose.yml**: Arquivo de configuração do Docker Compose, que define os serviços, redes e volumes necessários para rodar a API e o banco de dados.
- **water_gas_meter_api/Dockerfile**: Arquivo de configuração do Docker para criar a imagem da API.

# Documentação Técnica

## Diagrama Conceitual
O diagrama conceitual (**WaterGassMeterDBConceptual.png**) apresenta as principais entidades envolvidas no sistema, como Customer, Measure, e Confirmation. Essas entidades são relacionadas para formar a base da solução de medição, facilitando a compreensão dos principais componentes e suas interações.

## Diagrama Lógico
O diagrama lógico (**WaterGassMeterDBLogical.png**) reflete a estrutura do banco de dados relacional. Ele inclui tabelas e colunas específicas, como `customer_id`, `measure_value`, `confirmed_value`, entre outras, mostrando como os dados serão armazenados e relacionados no banco de dados.

# Configuração e Execução

## Requisitos
- **Docker**.
- **Docker Compose**.


## Passos para Configuração
1. **Clonar o Repositório**

```plaintext
git clone https://github.com/dyego-hcb/water-gas-meter-api
cd water-gas-meter-api
```

2. **Construir e Iniciar os Contêineres**
Execute o comando abaixo para construir as imagens e iniciar os contêineres:

```plaintext
docker-compose up --build
```
Isso criará e iniciará o contêiner do PostgreSQL e da API, além de configurar o banco de dados inicial.

2. **Verificar Conexão**
A API deve estar disponível em http://localhost:3000 e o banco de dados PostgreSQL em localhost:5234. Você pode verificar a conectividade com a API acessando as rota api/helloword/check-api, api/helloword/check-db, que deve retornar uma mensagem de "Hello World" indicando que foi possivel conectar a API, e a mesma conseguiu contectar ao PostgreSQL.

***

# Water & Gas Meter API

## Project Description

This project is an API designed for managing water and gas consumption measurements, including the collection, storage, and confirmation of customer-related data. The goal is to provide a robust and scalable solution for efficient management of measurements and confirmations, ensuring data integrity and accuracy.

## Repository Structure

The repository structure is organized to ensure clarity and separation of the different development phases, facilitating the maintenance and future expansion of the project.

```plaintext
water-gas-meter-api/
│
├── docs/
│   ├── diagrams/
│   │   ├── conceptual/
│   │   │   └── WaterGassMeterDBConceptual.png
│   │   ├── logical/
│   │   │   └── WaterGassMeterDBLogical.png
│
├── water_gas_meter_api/
│
└── README.md
```

# Directory Description

## docs/diagrams/
Contains diagrams and documents related to the design and structuring of the system.

- **conceptual/**: Includes the conceptual diagram that illustrates the main entities and their high-level relationships.
  - **WaterGassMeterDBConceptual.png**: Represents an abstract view of the system, highlighting the fundamental entities and their relationships.
  
- **logical/**: Contains the logical diagram, detailing the database modeling and its interdependencies.
  - **WaterGassMeterDBLogical.png**: EShows the structure of tables, primary keys, foreign keys, and relationships in the database.

water_gas_meter_api/
Contains the source code of the API, including the implementation of models, routes, and business logic.

- **water_gas_meter_api/src**: Contains the source code of the API, including the implementation of models, routes, and business logic.
- **water_gas_meter_api/docker-compose.yml**: Docker Compose configuration file that defines the services, networks, and volumes needed to run the API and the database.
- **water_gas_meter_api/Dockerfile**: Docker configuration file to create the API image.

# Technical Documentation

## Conceptual Diagram
The conceptual diagram (**WaterGassMeterDBConceptual.png**) presents the main entities involved in the system, such as Customer, Measure, and Confirmation. These entities are related to form the foundation of the measurement solution, facilitating the understanding of the main components and their interactions.

## Logical Diagram
The logical diagram (**WaterGassMeterDBLogical.png**) rreflects the structure of the relational database. It includes specific tables and columns, such as customer_id, measure_value, confirmed_value, among others, showing how the data will be stored and related in the database.

# Configuration and Execution

## Requirements
- **Docker**.
- **Docker Compose**.


## Configuration Steps
1. **Clone the Repository**

```plaintext
git clone https://github.com/dyego-hcb/water-gas-meter-api
cd water-gas-meter-api
```

2. **Build and Start the Containers**
Run the command below to build the images and start the containers:

```plaintext
docker-compose up --build
```
This will create and start the PostgreSQL and API containers, as well as set up the initial database.

2. **Check Connection**
The API should be available at http://localhost:3000 and the PostgreSQL database at localhost:5234. You can check the API connectivity by accessing the routes api/helloword/check-api and api/helloword/check-db, which should return a "Hello World" message indicating that the API was able to connect and the PostgreSQL database was also reachable.