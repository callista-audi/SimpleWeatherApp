class MessageForm extends HTMLElement {
    constructor() {
      super();
  
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          form {
            display: flex;
            flex-direction: column;
          }
  
          input,
          textarea {
            margin-bottom: 10px;
            padding: 5px;
            font-size: 16px;
          }
  
          textarea {
            height: 100px;
          }
  
          button {
            padding: 10px;
            font-size: 16px;
            background-color: #D3756B;
            color: #fff;
            border: 1px solid black;
            cursor: pointer;
          }
  
          button:hover {
            background-color: #F0997D;
          }
        </style>
  
        <form>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
  
          <label for="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
  
          <button type="submit">Submit</button>
        </form>
      `;
  
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  
    connectedCallback() {
      const form = this.shadowRoot.querySelector('form');
      form.addEventListener('submit', this.onSubmit.bind(this));
    }
  
    onSubmit(event) {
      event.preventDefault();
  
      const formData = new FormData(event.target);
      const name = formData.get('name');
      const message = formData.get('message');
  
      const messageEvent = new CustomEvent('message', {
        detail: {
          name,
          message
        }
      });
  
      this.dispatchEvent(messageEvent);
  
      event.target.reset();
    }
  }
  
  customElements.define('message-form', MessageForm);
  