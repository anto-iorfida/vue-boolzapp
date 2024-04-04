const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                  },
                  {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                  },
                  {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                  },
                  {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                  },
                  {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                  }
                ],
              },
            ],
            emocy: false,
            notific: true,
            animatedActive : false,
            settingMessage : null,
            activeChat: 0,
            messageSend:'',
            cerchContact:'',
            
        };
    },
    methods: {
        // setting up activeChat = index single object
        getNewChat(index){
            this.activeChat = index;
        },
        // activate/deactivate notifications box
        changeNotific(){
           this.notific = !this.notific
        },
        // activate/deactivate box with emocy
        getEmocy(){
           this.emocy =!this.emocy
        },
        // function user send message with input
        getSentMessage(){
            const templateSendMessage =
            {
                date: '10/01/2020 15:50:00',
                message: this.messageSend,
                status: 'sent'
            }
                 // if the length of the word does not exceed 0 the animation starts
            if(this.messageSend.length > 0){

                this.contacts[this.activeChat].messages.push(templateSendMessage);
                // sent messsage contact later 1 second
                setTimeout(() => {
                    this.getReceiveMessage()
                   }, 1000);

            }else{
                this.animatedActive = true
                setTimeout(() => {
                    this.animatedActive = false;
                }, 1000);
            }
           this.messageSend = '';
           
           
        },
        // function contact send message later 1 second
        getReceiveMessage(){
            const templateReceiveMessage =
            {
                date: '10/01/2020 15:50:00',
                message: 'ok',
                status: 'received'
            }
            this.contacts[this.activeChat].messages.push(templateReceiveMessage);

        },
       //verificy word input user whit word contact esist    
        getCerchContact() {
            this.contacts.forEach(contact => {
                const wordInput = this.cerchContact.toLowerCase(); 
                const contactName = contact.name.toLowerCase(); 
               
                if (!contactName.includes(wordInput)) {
                    contact.visible = false; 
                } else {
                    contact.visible = true; 
                }
            });
        },
        getSettingMessage(index){
            
            this.settingMessage = index;
        }
       
    }
}).mount('#app');
