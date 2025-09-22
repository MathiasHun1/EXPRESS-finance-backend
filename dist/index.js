import app from './app.js';
import config from './utils/config.js';
const PORT = config.PORT;
app.listen(PORT, async () => {
    console.log('Server is running on PORT: ', PORT);
});
//# sourceMappingURL=index.js.map