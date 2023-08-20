import csv
ar = ''
f = open('data4.csv', 'w')
with open('data3.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    
    for row in csv_reader:
        if line_count == 0:
            a=row[1].split('/')
            row[1]=a[2]+'/'+a[1]+'/'+a[0]
            ar=','.join(row)+'\n'
            f.writelines(ar)

f.close()