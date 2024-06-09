import { addAliases } from 'module-alias';
import 'module-alias/register';

// Add your custom aliases
addAliases({
  '@utils': `${__dirname}/utils`,
});
