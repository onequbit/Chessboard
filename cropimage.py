from PIL import Image, ImageDraw

image = Image.open('all_chess_pieces_small.png').convert("RGBA")
print(image.size) # 312 x 100 : 52 x 50
draw = ImageDraw.Draw(image)
height = 50
widths = [ 50, 50, 50, 50, 50, 50 ]
margin = [ -3, 3, 0, 0, 0, 0 ]



for row in range(2):
    for col in range(6):
        x1, x2 = col * (widths[col] + margin[col]), (col+1) * widths[col]
        y1, y2 = row * height, (row+1) * height
        draw.rectangle(((x1,y1), (x2,y2)), outline='red')

image.show()

# for row in range(2):
#     for col in range(6):
#         x1, x2 = col * width, (col+1) * width
#         y1, y2 = row * height, (row+1) * height
#         draw.rectangle(((x1,y1), (x2,y2)), outline='red')
#         box = (x1,y1,x2,y2)
#         filename = f"name: piece_{col}x{row}.png"
#         copy = image.copy()
#         cropped = copy.crop(box) 
#         cropped.save(filename)
#         cropped.show()

