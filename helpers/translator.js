const translator = require('counterpart');

translator.registerTranslations('ar', require('./../public/trans/ar'));
translator.registerTranslations('en', require('./../public/trans/en'));

module.exports = local => {
    translator.setLocale(local);
    return translator;
};