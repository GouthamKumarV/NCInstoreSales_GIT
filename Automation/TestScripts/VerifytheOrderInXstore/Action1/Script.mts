'###################################################################################################################fi 0.5i^FI )
'Test Script Name: VerifytheOrderInXstore
'Script Description: Retrieve the NC order in Xstore and confirm the order
'Designed By Date:ramesh thota
'Designed Date(MM/DD/YY): 04/14/2021
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales.xls"
TestScriptName = "TC001_OS_ISS_VerifytheOrderInXstore"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If Instr(1,CurrentTestCaseName,TestScriptName,0)>0 Then
		strUsername = DataTable.Value("XstoreUserName")
		strPassword = DataTable.Value("XstorePassword")
		strLoginType = DataTable.Value("LoginType")
		intMobileNum = datatable.Value("Mobile Number")
		
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
Repositoriescollection.Add DirPath&"\ObjectRepository\NCISS.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\MasterRepository.tsr"

LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\InStoreSales.qfl"
wait (2)

'If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
'	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
'Else
	Call LoginXstore(strLoginType,strUsername,strPassword)
	wait 1
'End If

JavaWindow("Oracle Retail Xstore Point").JavaButton("Get Orders").Click
JavaWindow("Oracle Retail Xstore Point").JavaButton("Pending Orders").Click @@ hightlight id_;_1748050746_;_script infofile_;_ZIP::ssf2.xml_;_
JavaWindow("Oracle Retail Xstore Point").JavaList("Pending Orders").Select 2 @@ hightlight id_;_1491537517_;_script infofile_;_ZIP::ssf4.xml_;_
JavaWindow("Oracle Retail Xstore Point").JavaButton("Retrieve Order Details").Click @@ hightlight id_;_1748050746_;_script infofile_;_ZIP::ssf5.xml_;_
JavaWindow("Oracle Retail Xstore Point").JavaButton("Complete Transaction").Click @@ hightlight id_;_1057439336_;_script infofile_;_ZIP::ssf6.xml_;_
JavaWindow("Oracle Retail Xstore Point").JavaCheckBox("icon-checkbox_2").Set "ON" @@ hightlight id_;_986418071_;_script infofile_;_ZIP::ssf10.xml_;_
JavaWindow("Oracle Retail Xstore Point").JavaButton("Cancel").Click @@ hightlight id_;_1674914998_;_script infofile_;_ZIP::ssf11.xml_;_

If Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Exist(30) Then
	Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Click
End  If

Call Logout(strLoginType) @@ hightlight id_;_965505585_;_script infofile_;_ZIP::ssf67.xml_;_

On Error GoTo 0
ExitRun
