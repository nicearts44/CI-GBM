int LED1= 7;
int BP= 2;
bool etatbouton;
bool etatled = 0;// désigne l'état de la led
bool saveetatbouton=0;// stocke l'état antérieur du bouton poussoir 
void setup() {
  pinMode(LED1,OUTPUT);
  pinMode(BP,INPUT);
  digitalWrite(LED1,LOW);// Eteindre la led au départ
}
void loop() {
 etatbouton= digitalRead(BP);// lecture de l'état du bouton poussoir 
  if (etatbouton== HIGH && saveetatbouton==0)// si le bouton est appuyé et que l'état antérieur est pas appuyé
    {
      etatled = 1- etatled;// Inversion de l'état de la led
      // Allumer la led si elle était éteinte et l'éteindre si elle était allumée
       if (etatled==1){
        digitalWrite(LED1,HIGH); 
       }else {
        digitalWrite(LED1,LOW);
            }
    }
saveetatbouton = etatbouton;
}
