wget https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquotenmonitoring.xlsx?__blob=publicationFile -O impf.xlsx
xlsx2csv -n Impfungen_proTag -f %Y-%m-%d impf.xlsx impf.csv
node parse.mjs
git commit -a -m "auto-update"
git push
