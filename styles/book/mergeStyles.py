import os

if __name__ == '__main__':
  stylesheets = os.listdir()
  styles = ""

  for fn in stylesheets:
    print("fn:", fn)
    with open(fn, 'r') as f:
      styles = styles + "body." + os.path.splitext(fn)[0] + " {\n\t" + str(f.readlines()) + "\n}\n"
    
  with open("books.css", 'w') as f:
    f.write(str(styles))
