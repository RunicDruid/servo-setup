import RPi.GPIO as GPIO  
from time import sleep   

def move_default():
	try:
		GPIO.setmode(GPIO.BOARD)
		GPIO.setup(11,GPIO.OUT)
		p = GPIO.PWM(11, 50)
		p.start(0)
		p.ChangeDutyCycle(3)
		sleep(1)
		p.ChangeDutyCycle(12)
		sleep(1)
		p.stop()
		GPIO.cleanup()
	except:
		print("something something excetpion")

def move_position(valueA, valueB):
	if type(valueA) == str and type(valueB) == str:
		valueA = int(valueA)
		valueB = int(valueB)
	if type(valueA) == int and type(valueB) == int:
		GPIO.setmode(GPIO.BOARD)
		GPIO.setup(11,GPIO.OUT)
		p = GPIO.PWM(11, 50)
		p.start(0)
		p.ChangeDutyCycle(valueA)
		sleep(1)
		p.ChangeDutyCycle(valueB)
		sleep(1)
		p.stop()
		GPIO.cleanup()