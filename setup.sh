#!/bin/bash



# Run npm install in the current directory
echo "Installing yarn packages in the jest directory..."
yarn install

# Check if src/server directory exists
if [ -d "src/server" ]; then
    # Navigate to src/server
    cd src/server

    # Run npm install in src/server
    echo "Installing npm packages in for discord server..."
    npm install

    # Create a .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        echo "Creating .env file..."
        touch .env
        echo "ATLAS_URI=your_connection_string" >> .env
	echo "DISCORD_TOKEN=your_discord_token" >> .env
	echo "GUILD_ID=your_discord_server_id" >> .env
	echo "CLIENT_ID=your_discord_client_id" >> .env
	echo "Created .env file!"
    fi
else
    echo "Directory 'src/server' not found."
fi
