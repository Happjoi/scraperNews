// Verifica se todas as variáveis de e-mail estão configuradas
function checkEmailConfig() {
  const requiredVars = [
    'EMAIL_HOST', 
    'EMAIL_PORT', 
    'EMAIL_USER', 
    'EMAIL_PASS',
    'EMAIL_FROM',
    'EMAIL_TO'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('Erro de configuração: As seguintes variáveis de ambiente estão faltando:');
    missingVars.forEach(varName => console.error(`- ${varName}`));
    return false;
  }

  return true;
}

module.exports = { checkEmailConfig };