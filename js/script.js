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
            // It is used to show the emocy box
            emocy: false,
            // It is used to change icon and text in box notific 
            notific: true,
            // if in the input the length of the word does not exceed 0 it appears
            animatedActive : false,
            // It is used to show the setting box of the single message
            settingMessage : null,
            // important index that makes the chat active
            activeChat: 0,
            // variable connected to the input, everything it writes user
            messageSend:'',
            // variable online and sta scrivendo...
            userAccess: 'Online',
            // // It is used for cerch contact in the input in box input user
            cerchContact:'',
            // random answers that the pc 
            risposteGenerali : [
              "Yo, che succede?",
              "Buongiorno! Sono felice di parlarti.",
              "Pronto a rispondere alle tue domande!",
              "Dimmi cosa hai in mente e farò del mio meglio per aiutarti.",
              "Non esitare a chiedere, sono qui per questo!",
              "Qualunque sia la tua richiesta, farò del mio meglio per soddisfarla.",
              "A tua disposizione per qualsiasi chiarimento o necessità.",
              "Sentiti libero di esplorare le mie capacità e farmi domande.",
              "Sono pronto ad ascoltarti e a darti il mio supporto.",
              "Insieme possiamo trovare la soluzione che cerchi.",
            ],
            
            
          
        };
    },
    methods: {

        // setting up activeChat = index single object
        getNewChat(index){
          this.activeChat = index;
          this.settingMessage = null;
          this.getAutoScroll()
        },

        // activate/deactivate notifications box
        changeNotific(){
           this.notific = !this.notific
        },

        // activate/deactivate box with emocy
        getEmocy(){
           this.emocy =!this.emocy
        },

        // time now in the single chat
        getFormattedDate() {
          const date = new Date();
          const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Europe/Rome' 
          };
          return date.toLocaleTimeString('it-IT', options);
        },

        // data in box date-chat 
        formatDate(activeChat) {
          
          if (this.contacts[0].messages.length > 0) {
            const dateParts = this.contacts[activeChat].messages[0].date.split(' ');
            console.log(dateParts);
            // return data 
            return dateParts[0]; 
          } 
        },
         
       // function user send message with input
        getSentMessage(){
          
            const templateSendMessage =
            {
                date: this.getFormattedDate(),
                message: this.messageSend,
                status: 'sent'
            }
             // if the length of the word does not exceed 0 the animation starts
            if(this.messageSend.length > 0){

                this.contacts[this.activeChat].messages.push(templateSendMessage);

                this.userAccess = 'Sta scrivendo'

                // sent messsage contact later 1 second
                setTimeout(() => {
                    this.getReceiveMessage()
                   }, 3000);
                setTimeout(() => {
                    this.userAccess = 'Online'
                }, 3001);
                  
                  
                  this.getAutoScroll()

            }else{
              // animation animatedInputWrong in input 
                this.animatedActive = true
                setTimeout(() => {
                    this.animatedActive = false;
                }, 1000);
            }

            this.messageSend = '';
           
        },
        
        // scoll automatic last message 
        getAutoScroll(){
          const chatScroll = this.$refs.chatScroll;
          setTimeout(()=>{
            chatScroll.scrollTop = chatScroll.scrollHeight;
          },1000);
          
        },

        // function contact send message later 1 second
        getReceiveMessage(){
            const templateReceiveMessage =
            {
                date: this.getFormattedDate(),
                // formula per generare risposte casuali
                message: this.risposteGenerali[Math.floor(Math.random() * this.risposteGenerali.length)],
                status: 'received'
            }
            this.contacts[this.activeChat].messages.push(templateReceiveMessage);
            
            this.getAutoScroll()

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

        // click add setting single message
        getSettingMessage(index){
            
            this.settingMessage = index;
           
            
        },
        
        // function delete single message
        deleteMessage(activeChat,index){
          this.contacts[activeChat].messages.splice(index, 1);
          this.settingMessage = null;
        },

        // 
       
    },
    
}).mount('#app');
