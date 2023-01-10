import astropy.io.fits as pyfits
import numpy as np

in_file = open("amqRC1loisim", "rb") # opening for [r]eading as [b]inary
data = in_file.read(1024) # if you only wanted to read 512 bytes, do .read(512)

print(type(data))
data2 = bytearray(data)
print(type(data2))
data = data.decode("utf-8")
data = data.split()
#print(data)
#print(data.split())
#rawdata = in_file.read(naxis1 * naxis2)
#rawdata = rawdata[1024:]

for chunk in data:
    print(chunk)
    if "NAXIS1" in chunk:
        naxis1 = int(chunk.split("=")[1])
    if "NAXIS2" in chunk:
        naxis2 = int(chunk.split("=")[1])

print(naxis1)
print(naxis2)

rawdata = in_file.read(2 * naxis1 * naxis2)
print(type(rawdata))
shortdata = np.frombuffer(rawdata, dtype=np.short)
print(type(shortdata))
shortdata.reshape(naxis1, naxis2)
print(type(shortdata))

hdu = pyfits.PrimaryHDU(shortdata)
hdul = pyfits.HDUList([hdu])
hdul.writeto('test.fit')


in_file.close()
