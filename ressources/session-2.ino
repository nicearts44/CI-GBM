int A=2;
int B=3;
int C=4;
 void setup() {
 pinMode(A,OUTPUT); // put your setup code here, to run once:
 pinMode(B,OUTPUT);
 pinMode(C,OUTPUT);
}

void loop() {
  // put your main code here, to run repatedly:
 digitalWrite(A,HIGH);
 delay(2000);
 digitalWrite(A,LOW);
 delay(1000);
digitalWrite(B,HIGH);
 delay(3000);
 digitalWrite(B,LOW);
 delay(2000);
digitalWrite(B,HIGH);
 delay(4000);
 digitalWrite(B,LOW);
 delay(3000);
 digitalWrite(C,HIGH);
 delay(2000);
 digitalWrite(C,LOW);
 delay(1000);
}
