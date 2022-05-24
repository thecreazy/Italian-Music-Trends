const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangIt } = require('@nlpjs/lang-it');

const getNlp = async () => {
    const container = await containerBootstrap();
    container.use(Nlp);
    container.use(LangIt);
    const nlp = container.get('nlp');
    nlp.settings.autoSave = false;
    nlp.addLanguage('it');
    nlp.addDocument('it', 'solo', 'feelings.sad');
    nlp.addDocument('it', 'senza', 'feelings.sad');
    nlp.addDocument('it', 'notte', 'feelings.sad');
    nlp.addDocument('it', 'basta', 'feelings.sad');
    nlp.addDocument('it', 'andare', 'feelings.sad');
    nlp.addDocument('it', 'sembrava', 'feelings.sad');
    nlp.addDocument('it', 'paura', 'feelings.sad');
    nlp.addDocument('it', 'giorno', 'feelings.good');
    nlp.addDocument('it', 'posso', 'feelings.good');
    nlp.addDocument('it', 'niente', 'feelings.sad');
    nlp.addDocument('it', 'nero', 'feelings.sad');
    nlp.addDocument('it', 'esco', 'feelings.good');
    nlp.addDocument('it', 'puoi', 'feelings.good');
    nlp.addDocument('it', 'futuro', 'feelings.good');
    nlp.addDocument('it', 'volere', 'feelings.sad');
    nlp.addDocument('it', 'dovere', 'feelings.sad');
    nlp.addDocument('it', 'dentro', 'feelings.sad');
    nlp.addDocument('it', 'manca', 'feelings.sad');
    nlp.addDocument('it', 'fuori', 'feelings.good');
    nlp.addDocument('it', 'muro', 'feelings.sad');
    nlp.addDocument('it', 'amore', 'feelings.good');
    nlp.addDocument('it', 'mare', 'feelings.good');
    nlp.addDocument('it', 'vita', 'feelings.good');
    nlp.addDocument('it', 'morire', 'feelings.sad');
    nlp.addDocument('it', 'muore', 'feelings.sad');
    nlp.addDocument('it', 'voglio', 'feelings.sad');
    nlp.addDocument('it', 'sempre solo', 'feelings.sad');
    nlp.addDocument('it', 'dopo', 'feelings.sad');
    nlp.addDocument('it', 'mai', 'feelings.sad');
    nlp.addDocument('it', 'quando', 'feelings.sad');
    await nlp.train();
    return nlp;
}

module.exports = getNlp