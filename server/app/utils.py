import binascii

def hex(x):
    h = hex(x)[2:].rstrip('L')
    return binascii.unhexlify('0'*(32-len(h))+h)

def unhex(x):
    hex = binascii.hexlify(x)
    return int(hex, 16)