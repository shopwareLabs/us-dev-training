import HttpClient from "src/service/http-client.service";

const { PluginBaseClass } = window;

export default class FaqSubmitPlugin extends PluginBaseClass {
    static options = {
        productId: null,
        productVersionId: null,
    };


    init() {
        this._client = new HttpClient();

        this.question = this.el.querySelector('#faq-submit-question');
        this.answer = this.el.querySelector('#faq-submit-answer');
        this.button = this.el.querySelector('#faq-submit-button');

        this._registerEvents();
    }

    _registerEvents() {
        this.button.onclick = this._submit.bind(this);
    }

    async _submit(event) {
        event.preventDefault();

        this._client.post(
            '/swag-faq/submit',
            JSON.stringify({
                productId: this.options.productId,
                productVersionId: this.options.productVersionId,
                question: this.question.value.trim(),
                answer: this.answer.value.trim(),
            }),
            (response) => {
                console.log(response);
            }
        );
    }
}
