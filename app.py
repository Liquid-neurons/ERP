from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

db_config = {
    'host': '49.206.252.212',
    'user': 'harish',
    'password': 'harish',
    'database': 'LMS',
    'port': '63306'  
}

@app.route('/Emp_TC', methods=['POST'])
def submit_Emp_TC():
    try:

        data = request.json
        
 
        EMPNAME = data['EMPNAME']
        EMPID = data['EMPID']
        ANNUALPAIDLEAVE = int(data['ANNUALPAIDLEAVE'])
        TIME_IN = data['TIME_IN']
        TIME_OUT = data['TIME_OUT']
        ALLOWED_LATE = int(data['ALLOWED_LATE'])


        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

 
        cursor.execute("""
            INSERT INTO Emp_TC (empName, empid, AnnualPaidLeave, Time_IN, Time_Out, Allowed_Late)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (EMPNAME, EMPID, ANNUALPAIDLEAVE, TIME_IN, TIME_OUT, ALLOWED_LATE))


        conn.commit()
        cursor.close()
        conn.close()


        return jsonify({'success': True, 'message': 'Data inserted successfully'})
    
    except Exception as e:

        return jsonify({'success': False, 'message': str(e)})

@app.route('/Emp_TC_OPT', methods=['POST'])
def submit_Emp_TC_OPT():
    try:

        data = request.json
        
 
        TCID = data['TCID']
        TCDESC = data['TCDESC']


        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

 
        cursor.execute("""
            INSERT INTO Emp_TC_OPT (TC_ID, TC_DESC)
            VALUES (%s, %s)
        """, (TCID,TCDESC))


        conn.commit()
        cursor.close()
        conn.close()


        return jsonify({'success': True, 'message': 'Data inserted successfully'})
    
    except Exception as e:

        return jsonify({'success': False, 'message': str(e)})

@app.route('/Emp_master', methods=['POST'])
def submit_Emp_master():
    try:

        data = request.json
        

        EMPNAME=data['EMPNAME']
        EMPID=data['EMPID']
        DOJ=data['DOJ']
        NAME=data['NAME']
        BDATE=data['BDATE']
        SEX=data['SEX']
        MTONGUE=data['MTONGUE']
        RELEGION=data['RELEGION']
        CAST=data['CAST']
        P_ADDRESS=data['P_ADDRESS']
        P_PHONE=data['P_PHONE']
        P_CODE=data['P_CODE']
        DISTANCE=data['DISTANCE']
        S_PHONE=data['S_PHONE']
        S_CODE=data['S_CODE']
        MAIL=data['MAIL']
        F_NAME=data['F_NAME']
        M_NAME=data['M_NAME']
        EDUCATIONAL_QUALIFICATION=data['EDUCATIONAL_QUALIFICATION']
        


        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

 
        cursor.execute("""
            INSERT INTO Emp_master (empName, empid, DoJ, NAME, BDATE, SEX, Mtongue, Religion, cast, P_ADDRESS, P_PHONE, P_CODE, DISTANCE, S_PHONE, S_CODE, MAIL, F_NAME, M_NAME, EDUCATIONAL_QUALIFICATION
)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (EMPNAME, EMPID, DOJ, NAME, BDATE, SEX, MTONGUE, RELEGION, CAST, P_ADDRESS, P_PHONE, P_CODE, DISTANCE, S_PHONE, S_CODE, MAIL, F_NAME, M_NAME, EDUCATIONAL_QUALIFICATION))


        conn.commit()
        cursor.close()
        conn.close()


        return jsonify({'success': True, 'message': 'Data inserted successfully'})
    
    except Exception as e:

        return jsonify({'success': False, 'message': str(e)})

@app.route('/STUDENT_MASTER', methods=['POST'])
def submit_STUDENT_MASTER():
    try:

        data = request.json
        

        NAME=data['NAME']
        BDATE=data['BDATE']
        SEX=data['SEX']
        MTONGUE=data['MTONGUE']
        RELEGION=data['RELEGION']
        CAST=data['CAST']
        P_ADDRESS=data['P_ADDRESS']
        P_PHONE=data['P_PHONE']
        P_CODE=data['P_CODE']
        DISTANCE=data['DISTANCE']
        S_PHONE=data['S_PHONE']
        S_CODE=data['S_CODE']
        MAIL=data['MAIL']
        F_NAME=data['F_NAME']
        M_NAME=data['M_NAME']
        G_NAME=data['G_NAME']
        EDUCATIONAL_QUALIFICATION=data['EDUCATIONAL_QUALIFICATION']
        OCCU=data['OCCU']
        M_INCOME=data['M_INCOME']
        C_INFO=data['C_INFO']
        C_AILMENT=data['C_AILMENT']
        C_AILMENT_INFO=data['C_AILMENT_INFO']
        APPLICATION_ID=data['APPLICATION_ID']
        


        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

 
        cursor.execute("""
            INSERT INTO STUDENT_MASTER (NAME,BDATE,SEX,Mtongue,Religion,cast,P_ADDRESS,P_PHONE,P_CODE,DISTANCE,S_PHONE,S_CODE,MAIL,F_NAME,M_NAME,G_NAME,EDUCATIONAL_QUALIFICATION,OCCU,M_INCOME,C_INFO,C_AILMENT,C_AILMENT_INFO,APPLICATION_ID
)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (NAME,BDATE, SEX, MTONGUE, RELEGION, CAST, P_ADDRESS, P_PHONE, P_CODE, DISTANCE, S_PHONE, S_CODE, MAIL, F_NAME, M_NAME, G_NAME, EDUCATIONAL_QUALIFICATION, OCCU, M_INCOME, C_INFO, C_AILMENT, C_AILMENT_INFO, APPLICATION_ID))


        conn.commit()
        cursor.close()
        conn.close()


        return jsonify({'success': True, 'message': 'Data inserted successfully'})
    
    except Exception as e:

        return jsonify({'success': False, 'message': str(e)})



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
