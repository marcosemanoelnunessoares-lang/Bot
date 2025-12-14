// deploy-commands.js
require('dotenv').config();

const { REST, Routes } = require('discord.js');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Seu Client ID e Guild ID (ID do Servidor)
const CLIENT_ID = '1396494446677459186'; 
const GUILD_ID = '1434634424674156626'; 

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Iniciando o registro de ${commands.length} comandos de aplicação.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log(`Registro concluído. ${data.length} comandos carregados.`);
	} catch (error) {
		console.error(error);
	}
})();