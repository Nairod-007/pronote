from bs4 import BeautifulSoup
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
import subprocess

subprocess.call(["node", "index.js"])

#Importation du fichier
chemindufichier = open(r"test.html")
page = BeautifulSoup(chemindufichier.read(),"html.parser")

#Prendre les <div> correspondant aux matière
txt = page.find_all('div', {'class' : 'Gras Espace'})
liste=[]
for i in range(len(txt)):
    for string in txt[i].strings: 
        liste.append(string)

moy = page.find('span',{'class':"Gras InlineBlock PetitEspaceHaut PetitEspaceBas EspaceDroit EspaceGauche10"})
b = []
for a in moy.strings:
    b.append(a)
moy = b[1]

#Enlever le vide
a=" "
while a in liste:
    del liste[liste.index(a)]

#conversion en float
note = [liste[i].replace(",",".") for i in range(0,len(liste),2)]
print(note)
matière = [liste[i] for i in range(1,len(liste),2)]
print(matière)
for i in range(len(matière)):
    if ">" in matière[i]:
        index = matière[i].index(">")
        matière[i]=matière[i][:index-1]

print('\n',matière)

#Trie des valeurs
for i in range(len(note)):
    note[i]=float(note[i])
print(note)


a=1
for i in range(len(matière)):
    if "ENSEIGN.SCIENTIFIQUE" in matière[i]:
        matière[i]=str(a)+" - ENSEIGN.SCIENTIFIQUE"
        a+=1
    elif "NUMERIQUE SC.INFORM." in matière[i]:
        matière[i]=str(a-3)+" - NUMERIQUE SC.INFORM."
        a+=1
print(matière,'\n')



#création d'un dictionnaire
dico={}
for i in range(len(note)):
    dico.update({matière[i]: note[i]})

#affichage
a=1
data = [['Matière', 'Note élève']]
for cle, valeur in dico.items():
    print("{} - {} : {}.".format(a,cle,valeur))
    data.append([cle,str(valeur)])
    a+=1


def moyenne(note,matiere):
    i = 0
    nb_note = 0
    total_note = 0
    while i < len(note):
        print(note[i])
        if matiere[i][0] == '1':
            a=0
            if matiere[i][4] == 'E':
                a+= note[i] + note[i+1] + note[i+2]
                b=3
                total_note+=round(a/b,2)
                nb_note+=1
                print(note[i] , note[i+1] , note[i+2],round(a/b,2))
                i += 3
            elif matiere[i][4] == 'N':
                a += note[i] + note[i + 1]
                b = 2
                total_note += round(a / b, 2)
                nb_note += 1
                print(note[i] , note[i+1] ,round(a/b,2))
                i += 2
        else:
            nb_note+=1
            total_note += note[i]
            i+=1
    return round(total_note/nb_note,2)




# Création du fichier PDF
doc = SimpleDocTemplate("tableau.pdf", pagesize=letter)
table = Table(data, colWidths=280)
table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                           ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                           ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                           ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                           ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
                           ('TOPPADDING', (0, 0), (-1, -1), 5),
                           ('GRID', (0, 0), (-1, -1), 1, colors.black)]))

note = moyenne(note,matière)
moyenne=[['Moyenne sans coefficient', str(note)],['Moyenne avec coefficient',str(moy)]]
table2 = Table(moyenne, colWidths=280)
table2.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), colors.grey),
                           ('TEXTCOLOR', (0, 0), (-1, -1), colors.whitesmoke),
                           ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                           ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
                           ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
                           ('TOPPADDING', (0, 0), (-1, -1), 5),
                           ('GRID', (0, 0), (-1, -1), 1, colors.black)]))
doc.build([table,table2])
#Fin pdf
