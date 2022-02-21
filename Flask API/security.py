from cryptography.fernet import Fernet

class Crypto:

    def __init__(self, key = False):
        self.__key = Fernet.generate_key() if key == False else key.encode("UTF-8")
        self.__cipher_suite = Fernet(self.__key)


    # return the Fernet key(private key) used in the encryption process.
    def get_key(self):
        return self.__key.decode("UTF-8")


    # encrypt a clear text
    def encrypt(self, plain_text):
        return self.__cipher_suite.encrypt((plain_text).encode("UTF-8")).decode("UTF-8")


    # decrypt the cipher text
    def decrypt(self, cipher_text):
        return self.__cipher_suite.decrypt(cipher_text.encode("UTF-8")).decode("UTF-8")

if __name__ == "__main__":
    c = Crypto(key='LrnoyToZH0acDaEnMgIeFPBLRABIMmE0FJboMOGEjrY=')
    print(c.decrypt('gAAAAABdcRXoPKNEYgZ-Q9nMvcDF0EA3rEApI1wl4KEZz-tRSOOtai4pcdVycPMztFstnJCW121hALaofv1h6-GLiEqOJW5yEQ=='))


