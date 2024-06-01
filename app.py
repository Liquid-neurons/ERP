from flask import Flask, request, jsonify
import mysql.connector
import base64
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import json
import re


app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

db_config = {
    'host': '49.206.252.212',
    'user': 'harish',
    'password': 'harish',
    'database': 'LMS',
    'port': '63306'  
}


db_config2 = {
    'host': '49.206.252.212',
    'user': 'harish',
    'password': 'harish',
    'database': 'config',
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

def generate_emp_id():
    conn = mysql.connector.connect(**db_config2)
    cursor = conn.cursor()
    
    # Fetch the last inserted application ID
    cursor.execute("SELECT LPAD(Current, 4, '0') FROM sequence_gen where Type='E'")
    last_id = cursor.fetchone()[0]
    new_id = int(last_id) + 1


    # Update the Current value in the sequence_gen table
    cursor.execute("UPDATE sequence_gen SET Current = %s WHERE Type = 'E' AND Icode = 'LMS'", (new_id,))
    conn.commit()
    
    # Format the new application ID
    new_emp_id = "ELMS" + str(new_id).zfill(4) # Pad with leading zeros
    
    cursor.close()
    conn.close()
    
    return new_emp_id

@app.route('/Emp_master', methods=['POST'])
def submit_Emp_master():
    try:

        data = request.json
        

        EMPNAME=data['EMPNAME']
        EMPID=generate_emp_id()
        DOJ=data['DOJ']
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
        base_64_image=data['imageBase64']

        blob_image = base64.b64decode(base_64_image)
        


        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

 
        cursor.execute("""
            INSERT INTO Emp_master (empName, empid, DoJ, BDATE, SEX, Mtongue, Religion, cast, P_ADDRESS, P_PHONE, P_CODE, DISTANCE, S_PHONE, S_CODE, MAIL, F_NAME, M_NAME, EDUCATIONAL_QUALIFICATION, IMAGE
)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (EMPNAME, EMPID, DOJ, BDATE, SEX, MTONGUE, RELEGION, CAST, P_ADDRESS, P_PHONE, P_CODE, DISTANCE, S_PHONE, S_CODE, MAIL, F_NAME, M_NAME, EDUCATIONAL_QUALIFICATION, blob_image))


        conn.commit()
        cursor.close()
        conn.close()


        return jsonify({'success': True, 'message': 'Data inserted successfully'})
    
    except Exception as e:

        return jsonify({'success': False, 'message': str(e)})

def generate_application_id():
    conn = mysql.connector.connect(**db_config2)
    cursor = conn.cursor()
    
    # Fetch the last inserted application ID
    cursor.execute("SELECT LPAD(Current, 4, '0') FROM sequence_gen where Type='S'")
    last_id = cursor.fetchone()[0]
    new_id = int(last_id) + 1


    # Update the Current value in the sequence_gen table
    cursor.execute("UPDATE sequence_gen SET Current = %s WHERE Type = 'S' AND Icode = 'LMS'", (new_id,))
    conn.commit()
    
    # Format the new application ID
    new_application_id = "SLMS" + str(new_id).zfill(4) # Pad with leading zeros
    
    cursor.close()
    conn.close()
    
    return new_application_id

def decode_base64_data_url(data_url):
    """
    Decodes a base64-encoded data URL.

    Args:
    data_url (str): The base64-encoded data URL.

    Returns:
    bytes: The decoded binary data.
    """
    if not data_url:
        return b''

    try:
        # Extract the base64 part from the Data URL
        base64_str = re.sub('^data:.*;base64,', '', data_url)

        # Decode the base64 string
        decoded_bytes = base64.b64decode(base64_str)
        
        return decoded_bytes
    except Exception as e:
        raise ValueError(f"Invalid base64 data URL: {e}")
        

@app.route('/STUDENT_MASTER', methods=['POST'])
def submit_STUDENT_MASTER():
    try:
        

         # Parse JSON data from request body
        json_data = request.data.decode('utf-8')
        data = json.loads(json_data)

        # Access files data
        file1_base64 = data['files']['file1']
        file2_base64 = data['files']['file2']
        file3_base64 = data['files']['file3']
        file4_base64 = data['files']['file4']
        file5_base64 = data['files']['file5']

  

        # Access form data
        NAME = data.get('name')
        BDATE = data.get('bdate')
        SEX = data.get('sex')
        MTONGUE = data.get('mtongue')
        RELEGION = data.get('religion')
        CASTE = data.get('caste')
        P_ADDRESS = data.get('p_address')
        P_PHONE = data.get('p_phone')
        DISTANCE = data.get('distance')
        S_PHONE = data.get('s_phone')
        MAIL = data.get('mail')
        F_NAME = data.get('f_name')
        F_QUALI = data.get('f_quali')
        F_OCC = data.get('f_occ')
        M_NAME = data.get('m_name')
        M_QUALI = data.get('m_quali')
        M_OCC = data.get('m_occ')
        G_NAME = data.get('g_name')
        M_INCOME = data.get('m_income')
        C_INFO = data.get('c_info')
        C_AILMENT = data.get('c_ailment')
        C_AILMENT_INFO = data.get('c_ailment_info')
        APPLICATION_ID=generate_application_id()
        image_blob = decode_base64_data_url(file1_base64)
        aadhar_blob = decode_base64_data_url(file2_base64)
        doc_blob = decode_base64_data_url(file3_base64)
        birth_blob = decode_base64_data_url(file4_base64)
        immu_blob = decode_base64_data_url(file5_base64)
        status_code=3

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

 
        cursor.execute("""
            INSERT INTO STUDENT_MASTER (NAME,BDATE,SEX,Mtongue,Religion,caste,P_ADDRESS,P_PHONE,DISTANCE,S_PHONE,MAIL,F_NAME,F_QUALI,F_OCC,M_NAME,M_QUALI,M_OCC,G_NAME,M_INCOME,C_INFO,C_AILMENT,C_AILMENT_INFO,APPLICATION_ID,IMAGE,STATUS_CODE,Cert1,Cert2,Cert3,Cert4
)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (NAME,BDATE, SEX, MTONGUE, RELEGION, CASTE, P_ADDRESS, P_PHONE, DISTANCE, S_PHONE, MAIL, F_NAME, F_QUALI, F_OCC, M_NAME, M_QUALI, M_OCC, G_NAME,  M_INCOME, C_INFO, C_AILMENT, C_AILMENT_INFO, APPLICATION_ID, image_blob, status_code, aadhar_blob, doc_blob, birth_blob, immu_blob))


        conn.commit()
        cursor.close()
        conn.close()


        return jsonify({'success': True, 'message': 'Data inserted successfully', 'id': APPLICATION_ID})
    
    except Exception as e:

        return jsonify({'success': False, 'message': str(e)})

@app.route('/login', methods=['POST'])
def login():
    # Get data from request
    data = request.json
    username = data.get('email')
    password = data.get('password')

    # Check if username and password are provided
    if not username or not password:
        return jsonify({'success': False, 'message': 'Username and password are required'})

    try:
        # Connect to MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute query to fetch hashed password for the provided username
        cursor.execute("SELECT password FROM admin WHERE email = %s", (username,))
        result = cursor.fetchone()

        # Check if user exists and password is correct
        if result and check_password_hash(result[0], password):
            cursor.execute("SELECT role from admin where email=%s",(username,))
            role=cursor.fetchone()
            return jsonify({'success': True, 'message': 'Login successful', 'role': role[0] })
        else:
            return jsonify({'success': False, 'message': 'Invalid username or password'})

    except Exception as e:
        return jsonify({'success': False, 'message': 'Error: ' + str(e)})

    finally:
        # Close database connection
        if conn:
            conn.close()
            
@app.route('/signup', methods=['POST'])
def signup():
    # Get data from request
    data = request.json
    username = data.get('email')
    password = data.get('password')
    password = generate_password_hash(password)

    # Check if username and password are provided
    if not username or not password:
        return jsonify({'success': False, 'message': 'Username and password are required'})

    try:
        # Connect to MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Insert user data into the database
        cursor.execute("""
            INSERT INTO admin (email, password, role)
            VALUES (%s, %s, %s)
        """, (username, password, 'applicant'))

        # Commit the transaction
        conn.commit()

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Return success response
        return jsonify({'success': True, 'message': 'User registered successfully'})

    except mysql.connector.Error as err:
        # Handle MySQL errors
        return jsonify({'success': False, 'message': f'MySQL Error: {err}'})

    except Exception as e:
        # Handle other exceptions
        return jsonify({'success': False, 'message': f'Error: {e}'})

       

@app.route('/application-ids', methods=['GET'])
def fetch_application_ids():
    try:
        # Connect to MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute query to fetch hashed password for the provided username
        cursor.execute("SELECT APPLICATION_ID FROM STUDENT_MASTER WHERE STATUS_CODE=3")
        # Fetch all rows
        rows = cursor.fetchall()

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Extract application IDs from rows
        application_ids = [row[0] for row in rows]

        # Return application IDs as JSON response
        return jsonify(application_ids)

    except Exception as e:
        return jsonify({'error': str(e)})

from flask import request

@app.route('/status-application-ids', methods=['POST'])
def fetch_application_status_ids():
    try:
        # Get email from the request
        data = request.json
        email = data.get('UserEmail')

        # Connect to MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute query to fetch application IDs for the provided email
        cursor.execute("SELECT APPLICATION_ID,STATUS_CODE FROM STUDENT_MASTER WHERE MAIL=%s", (email,))
        
        # Fetch all rows
        rows = cursor.fetchall()

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Extract application IDs from rows
        application_ids = [row[0] for row in rows]

        # Return application IDs as JSON response
        return jsonify(application_ids)

    except Exception as e:
        return jsonify({'error': str(e)})
        


@app.route('/accepted-ids', methods=['GET'])
def fetch_accepted_ids():
    try:
        # Connect to MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        conn2 = mysql.connector.connect(**db_config)
        cursor2 = conn.cursor()

        # Execute query to fetch hashed password for the provided username
        cursor.execute("SELECT APPLICATION_ID FROM STUDENT_MASTER WHERE STATUS_CODE=10")
        # Fetch all rows
        rows = cursor.fetchall()

        # Extract application IDs from rows
        application_ids = [row[0] for row in rows]
                    
                    
        cursor.close()
        conn.close()
        cursor2.close()
        conn2.close()
        # Return application IDs as JSON response
        return jsonify(application_ids)

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/fee-registration-status', methods=['GET'])
def fetch_registration_status():
    try:
        # Connect to MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute query to fetch Student_ID from S_FEE_MASTER where STATUS_CODE=1
        cursor.execute("SELECT Student_ID FROM S_FEE_MASTER WHERE STATUS_CODE=1")
        # Fetch all rows
        rows = cursor.fetchall()

        # Initialize a list to store student IDs
        student_ids = []

        # Iterate over the rows and extract student IDs
        for row in rows:
            student_ids.append(row[0])

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Return student IDs with fee registration status as JSON response
        return jsonify(student_ids)

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/sibling-registration-status', methods=['GET'])
def fetch_sibling_registration_status():
    try:
        # Connect to MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute query to fetch Student_ID from S_FEE_MASTER where STATUS_CODE=1
        cursor.execute("SELECT Student_ID FROM SIBLINGS_MASTER WHERE STATUS_CODE=1")
        # Fetch all rows
        rows = cursor.fetchall()

        # Initialize a list to store student IDs
        student_ids = []

        # Iterate over the rows and extract student IDs
        for row in rows:
            student_ids.append(row[0])
        
        # Close cursor and connection
        cursor.close()
        conn.close()

        # Return student IDs with fee registration status as JSON response
        return jsonify(student_ids)

    except Exception as e:
        return jsonify({'error': str(e)})




import base64

@app.route('/student-data', methods=['POST'])
def fetch_student_data():
    application_id = request.json.get('applicationId')
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Define the columns to select including the IMAGE columns
        columns = [
            'NAME', 'BDATE', 'SEX', 'Mtongue', 'Religion', 'caste', 'P_ADDRESS',
            'P_PHONE', 'DISTANCE', 'S_PHONE', 'MAIL', 'F_NAME', 'F_QUALI', 'F_OCC',
            'M_NAME', 'M_QUALI', 'M_OCC', 'G_NAME', 'M_INCOME', 'C_INFO', 'C_AILMENT',
            'C_AILMENT_INFO', 'APPLICATION_ID', 'IMAGE', 'STATUS_CODE', 'Cert1',
            'Cert2', 'Cert3', 'Cert4'
        ]

        # Construct the SQL query dynamically
        query = "SELECT {} FROM STUDENT_MASTER WHERE APPLICATION_ID = %s".format(', '.join(columns))

        # Execute the query with the application ID as a parameter
        cursor.execute(query, (application_id,))

        # Fetch all rows
        rows = cursor.fetchall()

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Check if student data is found
        if rows:
            student_data = []
            for row in rows:
                # Convert rows to dictionary format for JSON response
                student_dict = dict(zip(columns, row))
                # Convert image blobs to base64
                for field in ['IMAGE', 'Cert1', 'Cert2', 'Cert3', 'Cert4']:
                    blob_field = student_dict.pop(field)
                    if blob_field:
                        base64_field = base64.b64encode(blob_field).decode('utf-8')
                        student_dict[field] = base64_field
                student_data.append(student_dict)
            return jsonify(student_data)
        else:
            return jsonify({'error': 'Student data not found for application ID: {}'.format(application_id)}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/status-update', methods=['POST'])
def status_update():
    data = request.json
    status = data.get('message')
    application_id = data.get('applicationid')

    try:
        # Connect to MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        if status == 'accept':
            query = "UPDATE STUDENT_MASTER SET STATUS_CODE = 10 WHERE APPLICATION_ID = %s"
            cursor.execute(query, (application_id,))
        elif status == 'reject':
            query = "UPDATE STUDENT_MASTER SET STATUS_CODE = 11 WHERE APPLICATION_ID = %s"
            cursor.execute(query, (application_id,))

        # Commit the transaction
        conn.commit()

        # Close cursor and connection
        cursor.close()
        conn.close()

        return jsonify({'message': 'Status updated successfully'})

    except Exception as e:
        return jsonify({'error': str(e)})
        
@app.route('/fee-register', methods=['POST'])
def submit_fee_register():
    try:
        

        flag=False
        data = request.json
        
 
        INSTITUTE=data['INSTITUTE']
        STUDENTID=data['STUDENTID']
        SESSION=data['SESSION']
        CLASS=data['CLASS']
        JUNE=data['JUNE']
        JULY=data['JULY']
        AUGUST=data['AUGUST']
        SEPTEMBER=data['SEPTEMBER']
        OCTOBER=data['OCTOBER']
        NOVEMBER=data['NOVEMBER']
        DECEMBER=data['DECEMBER']
        JANUARY=data['JANUARY']
        FEBRUARY=data['FEBRUARY']
        MARCH=data['MARCH']
        LATEFEEAPPLICABLE=data['LATEFEEAPPLICABLE']
        LATEFEEPERDAY=data['LATEFEEPERDAY']
        CUTOFFDAY=data['CUTOFFDAY']
        CHATID=data['CHATID']
        STATUS_CODE=1
        R_FEE=data['R_FEE']
        REMARK=data['REMARK']
        S_FEE=data['S_FEE']
        B_FEE=data['B_FEE']
        U_FEE=data['U_FEE']
        R_DATE=data['R_DATE']
        A_DATE=data['A_DATE']
                


        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

 
        cursor.execute("""
            INSERT INTO S_FEE_MASTER (INSTITUTE, Student_ID, SESSION, CLASS, June, July, August, September, October, November, December, January, February, March, LateFeeApplicable, LateFee_PerDay, cutoffDay, Chat_ID, STATUS_CODE, R_FEE, REMARK, S_FEE, B_FEE, U_FEE, R_DATE, A_DATE
)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (INSTITUTE, STUDENTID, SESSION, CLASS, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER, JANUARY, FEBRUARY, MARCH, LATEFEEAPPLICABLE, 
LATEFEEPERDAY, CUTOFFDAY, CHATID, STATUS_CODE, R_FEE, REMARK, S_FEE, B_FEE, U_FEE, R_DATE, A_DATE
))


        conn.commit()

        cursor.execute("SELECT STATUS_CODE FROM SIBLINGS_MASTER WHERE STUDENT_ID=%s",(STUDENTID,))
        sibling_status=cursor.fetchone()
        if sibling_status:
            sibling_status=sibling_status[0]

        cursor.execute("SELECT STATUS_CODE FROM S_FEE_MASTER WHERE Student_id=%s",(STUDENTID,))
        fee_status=cursor.fetchone()
        if fee_status:
            fee_status=fee_status[0]

        if(sibling_status==1 and fee_status==1):
            cursor.execute("SELECT NAME FROM STUDENT_MASTER WHERE APPLICATION_ID=%s",(STUDENTID,))
            NAME = cursor.fetchone()[0]
            
            
            cursor.execute("SELECT IMAGE FROM STUDENT_MASTER WHERE APPLICATION_ID=%s",(STUDENTID,))
            IMAGE = cursor.fetchone()[0]

            cursor.execute("""
            INSERT INTO ATTENDENCE_MASTER (NAME, id, IMAGE
)
            VALUES (%s, %s, %s)
        """, (NAME, STUDENTID, IMAGE
))
            conn.commit()

            cursor.execute("UPDATE STUDENT_MASTER SET STATUS_CODE=8 WHERE APPLICATION_ID=%s",(STUDENTID,))
            conn.commit()

        
        cursor.close()
        conn.close()


        return jsonify({'success': True, 'message': 'Data inserted successfully'})
    
    except Exception as e:

        return jsonify({'success': False, 'message': str(e)})

@app.route('/sibling-register', methods=['POST'])
def submit_sibling_register():
    try:
        
        data = request.json
        
 
        STUDENTID=data['STUDENTID']
        NAME=data['NAME']
        CLASS=data['CLASS']
        AGE=data['AGE']
        STATUS_CODE=1


        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

 
        cursor.execute("""
            INSERT INTO SIBLINGS_MASTER (STUDENT_ID, NAME, CLASS, AGE, STATUS_CODE
)
            VALUES (%s, %s, %s, %s, %s)
        """, (STUDENTID, NAME, CLASS, AGE, STATUS_CODE
))

        
        conn.commit()

        cursor.execute("SELECT STATUS_CODE FROM SIBLINGS_MASTER WHERE STUDENT_ID=%s",(STUDENTID,))
        sibling_status=cursor.fetchone()
        if sibling_status:
            sibling_status=sibling_status[0]

        cursor.execute("SELECT STATUS_CODE FROM S_FEE_MASTER WHERE Student_id=%s",(STUDENTID,))
        fee_status=cursor.fetchone()
        if fee_status:
            fee_status=fee_status[0]

        if(sibling_status==1 and fee_status==1):
            cursor.execute("SELECT NAME FROM STUDENT_MASTER WHERE APPLICATION_ID=%s",(STUDENTID,))
            NAME = cursor.fetchone()[0]
            
            
            cursor.execute("SELECT IMAGE FROM STUDENT_MASTER WHERE APPLICATION_ID=%s",(STUDENTID,))
            IMAGE = cursor.fetchone()[0]

            cursor.execute("""
            INSERT INTO ATTENDENCE_MASTER (NAME, id, IMAGE
)
            VALUES (%s, %s, %s)
        """, (NAME, STUDENTID, IMAGE
))
            conn.commit()

            cursor.execute("UPDATE STUDENT_MASTER SET STATUS_CODE=8 WHERE APPLICATION_ID=%s",(STUDENTID,))
            conn.commit()
            


        
        cursor.close()
        conn.close()


        return jsonify({'success': True, 'message': 'Data inserted successfully'})
    
    except Exception as e:

        return jsonify({'success': False, 'message': str(e)})


@app.route('/student-master-desc', methods=['GET'])
def fetch_student_master_desc():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM STUDENT_MASTER_desc")
    rows = cursor.fetchall()

    # Create a dictionary to hold the results
    student_master_desc = {}
    for row in rows:
        FIELD = row[0]  # Assuming FIELD column is the first column
        COMMENT = row[1]  # Assuming COMMENT column is the second column
        student_master_desc[FIELD] = COMMENT

    # Close cursor and connection
    cursor.close()
    conn.close()

    # Return the dictionary as JSON
    return json.dumps(student_master_desc)

@app.route('/fee-master-desc', methods=['GET'])
def fetch_fee_master_desc():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM S_FEE_MASTER_desc")
    rows = cursor.fetchall()

    # Create a dictionary to hold the results
    student_master_desc = {}
    for row in rows:
        FIELD = row[0]  # Assuming FIELD column is the first column
        COMMENT = row[1]  # Assuming COMMENT column is the second column
        student_master_desc[FIELD] = COMMENT

    # Close cursor and connection
    cursor.close()
    conn.close()

    # Return the dictionary as JSON
    return json.dumps(student_master_desc)
    
@app.route('/fetch-inst_codes', methods=['GET'])
def fetch_inst_codes():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT INST_CODE from INSTITUTE_MASTER")
    rows=cursor.fetchall()
    cursor.close()
    conn.close()

    inst_codes = [row[0] for row in rows]

    return jsonify(inst_codes)

@app.route('/fetch-grades', methods=['POST'])
def fetch_grades():
    data = request.get_json()
    institute = data.get('INSTITUTE')
    if not institute:
        return jsonify({"error": "INSTITUTE parameter is missing"}), 400
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT GRADE from S_GRADE_MASTER where INSTITUTE=%s",(institute,))
    rows=cursor.fetchall()
    cursor.close()
    conn.close()

    grades = [row[0] for row in rows]
    return jsonify(grades)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
