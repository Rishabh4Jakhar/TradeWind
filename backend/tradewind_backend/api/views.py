from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status


@api_view(['POST'])
def login_user(request):
    user_id = request.data.get('userid')
    password = request.data.get('password')

    with connection.cursor() as cursor:
        cursor.execute("SELECT Password FROM User WHERE UserID = %s", [user_id])
        result = cursor.fetchone()

        if not result:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        stored_hash = result[0]
        if check_password(password, stored_hash):
            return Response({"message": "Login successful", "userid": user_id})
        else:
            return Response({"error": "Incorrect password"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register_user(request):
    user_id = request.data.get('userid')
    name = request.data.get('name')
    email = request.data.get('email')
    raw_password = request.data.get('password')

    try:
        with connection.cursor() as cursor:
            # Hash the password before storing
            hashed_password = make_password(raw_password)

            cursor.execute("""
                INSERT INTO User (UserID, Name, Email, Password, Virtual_Balance)
                VALUES (%s, %s, %s, %s, %s)
            """, [user_id, name, email, hashed_password, 1000.00])

        return Response({"message": "User registered successfully"})

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Helper to run raw SQL and return results as list of dicts
def run_query(query, params, description):
    with connection.cursor() as cursor:
        cursor.execute(query, params)
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return {"query_info": description, "results": rows}


@api_view(['POST'])
def user_profile(request):
    user_id = request.data.get('userid')
    query = """
        SELECT UserID, Name, Email, Virtual_Balance
        FROM User
        WHERE UserID = %s
    """
    # return response in json format 
    #print("User Info: ", user_id)
    with connection.cursor() as cursor:
        #cursor.execute(query, [user_id])
        #result = cursor.fetchone()
        #print("User Info: ", result)
        #return Response(result)
        cursor.execute(query, [user_id])
        result = cursor.fetchone()
    #result = run_query(query, [user_id], f"User info for User ID: {user_id}")
    return Response(run_query(query, [user_id], f"User info for User ID: {user_id}"))

@api_view(['POST'])
def user_portfolio(request):
    user_id = request.data.get('userid')
    query = """
        SELECT p.UserID, u.Name, s.Symbol, s.Stock_Name, p.Quantity, s.Current_Price,
               (p.Quantity * s.Current_Price) AS Current_Value
        FROM Portfolio p
        JOIN User u ON p.UserID = u.UserID
        JOIN Stock s ON p.StockID = s.StockID
        WHERE p.UserID = %s
    """
    return Response(run_query(query, [user_id], f"Portfolio for User ID: {user_id}"))


@api_view(['POST'])
def user_transactions(request):
    user_id = request.data.get('userid')
    query = """
        SELECT t.TransactionID, t.StockID, s.Symbol, t.Price, t.Quantity, t.Buy_Sell, 
               t.Status, t.Date_Time
        FROM Transaction t
        JOIN Stock s ON t.StockID = s.StockID
        WHERE t.UserID = %s
        ORDER BY t.Date_Time DESC
    """
    return Response(run_query(query, [user_id], f"Transactions for User ID: {user_id}"))


@api_view(['POST'])
def stock_transactions(request):
    stock_id = request.data.get('stockid')
    query = """
        SELECT t.TransactionID, u.Name, t.Price, t.Quantity, t.Buy_Sell, t.Status, t.Date_Time
        FROM Transaction t
        JOIN User u ON t.UserID = u.UserID
        WHERE t.StockID = %s
        ORDER BY t.Date_Time DESC
    """
    return Response(run_query(query, [stock_id], f"Transactions for Stock ID: {stock_id}"))


@api_view(['POST'])
def top_holders(request):
    stock_id = request.data.get('stockid')
    query = """
        SELECT p.UserID, u.Name, s.Symbol, s.Stock_Name, p.Quantity
        FROM Portfolio p
        JOIN User u ON p.UserID = u.UserID
        JOIN Stock s ON p.StockID = s.StockID
        WHERE p.StockID = %s
        ORDER BY p.Quantity DESC
        LIMIT 10
    """
    return Response(run_query(query, [stock_id], f"Top holders of Stock ID: {stock_id}"))


@api_view(['POST'])
def transactions_in_range(request):
    user_id = request.data.get('userid')
    start_date = request.data.get('start_date')
    end_date = request.data.get('end_date')
    query = """
        SELECT t.TransactionID, t.StockID, s.Symbol, t.Price, t.Quantity, t.Buy_Sell,
               t.Status, t.Date_Time
        FROM Transaction t
        JOIN Stock s ON t.StockID = s.StockID
        WHERE t.UserID = %s AND DATE(t.Date_Time) BETWEEN %s AND %s
        ORDER BY t.Date_Time DESC
    """
    return Response(run_query(query, [user_id, start_date, end_date], f"Transactions for User ID: {user_id} between {start_date} and {end_date}"))
