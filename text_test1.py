
#import
import tkinter as tk
from tkinter import ttk
from tkinter import font

#root window
root = tk.Tk()



def bold():
    label_text = selected_label.cget("text")
    selected = label_text[15:]
    
    # check if italic is already applied
    has_italic = bool(text.tag_nextrange("italic", tk.SEL_FIRST, tk.SEL_LAST))
    has_bold = bool(text.tag_nextrange("bold", tk.SEL_FIRST, tk.SEL_LAST))
    
    try:
        if has_bold:
            # remove bold 
            text.tag_remove("bold", tk.SEL_FIRST, tk.SEL_LAST)
            if has_italic:
                # Keep italic only
                pass
        else:
            # Add bold
            bold_font = font.Font(text, text.cget("font"))
            if has_italic:
                bold_font.configure(weight="bold", slant="italic", size=14)
                text.tag_remove("italic", tk.SEL_FIRST, tk.SEL_LAST)
            else:
                bold_font.configure(weight="bold", size=14)
            text.tag_configure("bold", font=bold_font)
            text.tag_add("bold", tk.SEL_FIRST, tk.SEL_LAST)
    except tk.TclError:
        pass





def italics():
    label_text = selected_label.cget("text")
    selected = label_text[15:]
    
    # check if bold is already applied
    has_bold = bool(text.tag_nextrange("bold", tk.SEL_FIRST, tk.SEL_LAST))
    has_italic = bool(text.tag_nextrange("italic", tk.SEL_FIRST, tk.SEL_LAST))
    
    try:
        if has_italic:
            # remove italic
            text.tag_remove("italic", tk.SEL_FIRST, tk.SEL_LAST)
            if has_bold:
                # Keep bold only
                pass
        else:
            # Add italic
            italics_font = font.Font(text, text.cget("font"))
            if has_bold:
                italics_font.configure(slant="italic", weight="bold", size=14)
                text.tag_remove("bold", tk.SEL_FIRST, tk.SEL_LAST)
            else:
                italics_font.configure(slant="italic", size=14)
            text.tag_configure("italic", font=italics_font)
            text.tag_add("italic", tk.SEL_FIRST, tk.SEL_LAST)
    except tk.TclError:
        pass

italics_button_style = ttk.Style()
italics_button_style.configure("italic.TButton", font = ("Arial", 12, "italic"))

bold_button_style = ttk.Style()
bold_button_style.configure("bold.TButton", font = ("Arial", 12, "bold"))

text = tk.Text(root, exportselection = 0, font = ("Arial", 14))
italics_button = ttk.Button(root, text = "I", style = "italic.TButton", width = 2, command = italics, takefocus = 0)
bold_button = ttk.Button(root, text = "B", style = "bold.TButton", width = 2, command = bold, takefocus = 0)
selected_label = ttk.Label(root, text = "Selected Text:")

italics_button.grid(column = 0, row = 0)
bold_button.grid(column = 1, row = 0)
text.grid(column = 0, row = 1,columnspan = 2)
selected_label.grid(column = 0, row = 2, columnspan = 2)


def selection(event):
    if event.widget.tag_ranges(tk.SEL):
        try:
            global selected_text
            selected_text = event.widget.get(tk.SEL_FIRST, tk.SEL_LAST)
            selected_label.config(text = f"Selected Text: {selected_text}")
        except tk.TclError:
            pass


text.bind("<ButtonRelease-1>", selection)

root.mainloop()