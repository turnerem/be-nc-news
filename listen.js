const { PORT = 9090 } = process.env;
const app = require('./app')

app.listen(PORT, () => console.log(`listening on port ${PORT}`));