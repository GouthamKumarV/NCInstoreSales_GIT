'##################################################################################################################
'Test Script Name: TC001_UserAccess_Sample
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:RAMESH
'Designed Date(MM/DD/YY): 11/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales.xls"
TestScriptName = "AO2_01_ISS_UAT_108"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = trim(DataTable.Value("TCName"))
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
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctionsNCOwn.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"

wait 2
Call LoginXstore(LoginType,strXstoreUsername,strXstorePassword)
Wait 2
Call FinalCheckXstoreValueValidation()

Function FinalCheckXstoreValueValidation()
	
	Set myobj = createobject("wscript.shell")
	wait 2
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Get Orders").Click   'Press F6
	wait 2
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Pending Orders").Click  'Press F2
	wait 5
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Retrieve Order Details").Click 'Press F2
	wait 3
	
	If JavaWindow("Oracle Retail Xstore Point").JavaButton("Help").Exist(2) Then
		Reporter.ReportEvent micPass, "Help button","Help Buton is verified in Xstore Application "
	Else
		Reporter.ReportEvent micFail, "Help button","Help Buton is failed to verify in Xstore Application "
	End If
	
	If JavaWindow("Oracle Retail Xstore Point").JavaButton("Log Off").Exist(2) Then
		Reporter.ReportEvent micPass, "Log Off button","Log Off Buton is verified in Xstore Application "
	Else
		Reporter.ReportEvent micFail, "Log Off button","Log Off Buton is Failed to verify in Xstore Application "
	End If

	wait 3
	If JavaWindow("Oracle Retail Xstore Point").JavaButton("Total").Exist(3)   Then 'Press F7
		Wait 2
			myobj.SendKeys "{F7}"
		Reporter.ReportEvent micPass, "F7 button","F7 Buton is verified in Xstore Application "
	'Else
		'Reporter.ReportEvent micFail, "F7 button","F7 Buton is Failed to verify in Xstore Application "
	End If
	
'	wait 3
'	If JavaWindow("Oracle Retail Xstore Point").JavaButton("Total").Exist(5) Then
'		JavaWindow("Oracle Retail Xstore Point").JavaButton("Total").Click
'	End If
	
	wait 2
	If JavaWindow("Oracle Retail Xstore Point").JavaButton("Complete Transaction").Exist(5) Then
		Wait 2
		myobj.SendKeys "{F7}"
		Reporter.ReportEvent micPass, "F7 button","F7 Buton is verified in Xstore Application "
		'JavaWindow("Oracle Retail Xstore Point").JavaButton("Complete Transaction").Click
	
	End  If
	'JavaWindow("Oracle Retail Xstore Point").JavaButton("Total").Click  'Press F7
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
	JavaWindow("Oracle Retail Xstore Point").JavaEdit("CASH amount").Set CashAmount
	wait 2
	myobj.SendKeys "{ENTER}"
	wait 5
	
	'End If
	
	If JavaWindow("Oracle Retail Xstore Point").JavaButton("Email Only").Exist(3) Then
		JavaWindow("Oracle Retail Xstore Point").JavaButton("Email Only").Click
	End If
	wait 3
	
	If JavaWindow("text:=Oracle Retail.*").JavaButton("text:=OK").Exist(3) Then
		JavaWindow("text:=Oracle Retail.*").JavaButton("text:=OK").Click
	End If
	wait 3
	If JavaWindow("text:=Oracle Retail.*").JavaButton("text:=OK").Exist(3) Then
		JavaWindow("text:=Oracle Retail.*").JavaButton("text:=OK").Click
	End If
	wait 3
	If JavaWindow("text:=Oracle Retail.*").JavaButton("text:=OK").Exist(3) Then
		JavaWindow("text:=Oracle Retail.*").JavaButton("text:=OK").Click
	End If
	wait 3
	If Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Exist(2) Then
		Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Click
	End If
	wait 3
	If Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Exist(2) Then
		Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Click
	End If
	wait 3
	If Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Exist(2) Then
		Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Click
	End If
	wait 3
	'END OF SALE JOURNEY	
	If JavaWindow("text:=Oracle Retail.*").JavaButton("text:=OK").Exist(3) Then
		JavaWindow("text:=Oracle Retail.*").JavaButton("text:=OK").Click
	End If

End Function

On Error GoTo 0
ExitRun



