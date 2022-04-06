const chalk = require('chalk');
const { version } = require('../../package.json');

const Greeting = `
               ${chalk.blue(`uCode v4 插件脚手架 v${version}`)}                                    
                                                       
              _|_|_|                    _|             
 _|    _|   _|           _|_|       _|_|_|     _|_|    
 _|    _|   _|         _|    _|   _|    _|   _|_|_|_|  
 _|    _|   _|         _|    _|   _|    _|   _|        
   _|_|_|     _|_|_|     _|_|       _|_|_|     _|_|_|  
                                                       
                                                                                                       
`;

module.exports = Greeting;
