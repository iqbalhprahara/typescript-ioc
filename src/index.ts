const argv = process.argv.slice(2);

const app = argv[0];

switch (app) {
    case 'cron':
        require('boot/cron')
        break;

    case 'consumer':
        require('boot/consumer')
        break;

    case 'api':
    default:
        require('boot/api')
        break;
}