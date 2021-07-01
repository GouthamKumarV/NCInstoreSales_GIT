'##################################################################################################################
'Test Script Name: TC001_UserAccess_Sample
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:RAMESH
'Designed Date(MM/DD/YY): 11/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales.xls"
TestScriptName = "AO2_01_ISS_UAT_104"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If strcomp(CurrentTestCaseName,TestScriptName)=0 Then
		LoginType = Datatable.Value("Login")
		strUsername = trim(DataTable.Value("UserName"))
		strPassword = trim(DataTable.Value("Password"))
		strXstoreUsername = DataTable.Value("XstoreUserName")
		strXstorePassword = DataTable.Value("XstorePassword")
		Exit For
	End If
Next
	
'Using for jenkins
strScriptLoc="Local"
TestScriptRootPath=Environment.Value("TestDir")
spath=Split(TestScriptRootPath,"\")
If strScriptLoc="Local" Then
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)
Else
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)&"\"&spath(3)&"\"&spath(4)&"\"&spath(5)&"\"&spath(6)&"\"&spath(7)&"\"&spath(8)&"\"&spath(9)&"\"&spath(10)
End If

'loading object repositories and library files
Repositoriescollection.Add DirPath&"\ObjectRepository\Evolution.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\Steffy_NC.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\LocalRepo.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\InventoryManagement.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\FinalLocalRepo.tsr"
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
'LoadFunctionLibrary DirPath&"\FunctionLibrary\Evolution.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"

wait 2
Call LoginXstore(LoginType,strXstoreUsername,strXstorePassword)
Wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Get Orders").Click
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Get Orders").Exist(2) Then
    JavaWindow("Oracle Retail Xstore Point").JavaButton("Get Orders").Click
End If
Wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Pending Orders").Click
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Pending Orders").Exist(2) Then
    JavaWindow("Oracle Retail Xstore Point").JavaButton("Pending Orders").Click
End If
Wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaList("Pending Orders").Select "#0"
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Pending Orders").Exist(2) Then
    JavaWindow("Oracle Retail Xstore Point").JavaButton("Pending Orders").Select "#1"
End If
Wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Retrieve Order Details").Click
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Retrieve Order Details").Exist(2) Then
    JavaWindow("Oracle Retail Xstore Point").JavaButton("Retrieve Order Details").Click
End If

	JavaWindow("Oracle Retail Xstore Point").JavaButton("Total").Click  'Press F7
	wait 2
	JavaWindow("Oracle Retail Xstore Point").JavaCheckBox("icon-checkbox").Set "ON"
	wait 2
	JavaWindow("Oracle Retail Xstore Point").JavaCheckBox("icon-checkbox_2").Set "ON"
	wait 2
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm_2").Click
	wait 2
	JavaWindow("Oracle Retail Xstore Point").JavaButton("OK").Click
	wait 5
	CashAmount = JavaWindow("text:=Oracle Retail.*").JavaStaticText("text:=£.*").getRoproperty("text")
	wait 2
	JavaWindow("Oracle Retail Xstore Point").JavaEdit("CASH amount").Set "100"
	wait 2
	Set myobj = createobject("wscript.shell")
	myobj.SendKeys "{ENTER}"
	wait 2
	
	If JavaWindow("Oracle Retail Xstore Point").JavaList("Sale Payment Options").Exist(3) Then
		wait 2
		JavaWindow("Oracle Retail Xstore Point").JavaList("Sale Payment Options").Select "#4"
	End If
	wait 2
	If JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm_2").Exist(3) Then
		JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm_2").Click
	End If
	wait 4
	If JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Exist(3) Then
		JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click
	End  If
	wait 2
	
	If JavaWindow("Oracle Retail Xstore Point").JavaButton("Cancel").Exist(3) Then
		JavaWindow("Oracle Retail Xstore Point").JavaButton("Cancel").Click
	End If
	
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Log Off").Click
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Log Off").Exist(2) Then
    JavaWindow("Oracle Retail Xstore Point").JavaButton("Log Off").Click
    Wait 2
   ' JavaWindow("Oracle Retail Xstore Point").JavaButton("No").Click
   ' Wait 2
    'JavaWindow("Oracle Retail Xstore Point").JavaButton("Log Off").Click
    'Wait 2
   	If (JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Exist(2)) Then
		Reporter.ReportEvent micPass, "Transaction abandoned, Xstore Logged off","Test Passed"
		Else
		Reporter.ReportEvent micFail, "Transaction not abandoned, Xstore is active","Test Failed"
		wait 2
	End if 
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
End If

wait 2

On Error GoTo 0
ExitRun


