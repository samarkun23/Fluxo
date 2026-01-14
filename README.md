## Demo video 
[![Demo Video](https://img.youtube.com/vi/your_video_id/0.jpg)](https://www.youtube.com/watch?v=your_video_id)

# Fluxo
Fluxo is a automation web application , which allows users to create and manage workflows to automate repetitive tasks. With Fluxo, users can design custom workflows using a visual interface, integrating various services and applications to streamline their processes.

## Upcoming Features
- **Advanced Analytics**: Gain insights into workflow performance with detailed analytics and reporting.
- **More Integrations**: Connect with a wider range of services and applications to enhance workflow capabilities.
- **Quick Start Templates**: Access pre-built workflow templates to get started quickly.
- **Workflow Sharing**: Share workflows with other users or teams for collaboration.

## Features
- **Visual Workflow Designer**: Create workflows using a drag-and-drop interface.
- **Integration with Multiple Services**: Connect to popular services like Gmail, Solana
- **Customizable Triggers and Actions**: Set up triggers based on events and define actions to be performed.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/samarkun23/Fluxo.git 
    ```
2. Navigate to the project directory:
    ```bash
    cd Fluxo
     ```
3. Install the dependencies:
    ```bash
    pnpm install 
    ```

4. Set up the database , Go to ./packages/db and create a .env file based on the .env.example file.
    ```bash
    cd ./packages/db
    touch .env
    npx prima migrate dev
    npx prisma generate
    ../../pnpm install
    ```
5. Now, Go to the ./apps/backend directory and create a .env file based on the .env.example file.
6. Install the dependencies:
    ```bash
    cd ../apps/backend
    touch .env
    npm install
    ``` 
7. Start the development server:
    ```bash
    npm run dev
    ```
8. Now, Go to the ./apps/frontend directory and create a .env file based on the .env.example file.
9. Install the dependencies:
    ```bash
    cd ../frontend
    touch .env
    npm install
    ``` 
10. Start the development server:
    ```bash
    npm run dev
    ``` 
11. Now , Start a kafka locally using docker : 
    ```bash
    docker run -d --name kafka-fluxo -p 9092:9092
    ``` 
12. Create a topic named "zap-events" in kafka :
    ```bash
    docker exec -it kafka-fluxo kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
    ```
13. Now , Go to the ./apps/hooks and create a .env file based on the .env.example file.
14. Install the dependencies:
    ```bash
    cd ../hooks
    touch .env
    npm install
    ``` 
15. Start the development server:
    ```bash
    npm run dev
    ```
16. Now , Go to the ./apps/processor and create a .env file based on the .env.example file.
17. Install the dependencies:
    ```bash
    cd ../processor
    touch .env
    npm install
    ``` 
18. Start the development server:
    ```bash
    npm run dev
    ```
19. Now, Go to the ./apps/sweeper and create a .env file based on the .env.example file.
20. Install the dependencies:
    ```bash 
    cd ../sweeper
    touch .env
    npm install
    ``` 
21. Start the development server:
    ```bash
    npm run dev
    ```

## Usage
1. Open your web browser and navigate to `http://localhost:3000`.
2. Sign up for a new account or log in if you already have one.
3. Use the visual workflow designer to create and manage your workflows.
4. Connect to various services and set up triggers and actions as needed.
## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Open a pull request to the main repository.
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details
## Contact
For any questions or inquiries, please contact us at samarkun3@gmail.com
