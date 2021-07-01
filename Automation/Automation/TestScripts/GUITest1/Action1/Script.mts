'###################################################################################################################fi 0.5i^FI )
'Test Script Name: TC001_UserAccess_Sample
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:RAMESH
'Designed Date(MM/DD/YY): 11/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales_Ramesh.xls"
TestScriptName = "GUITest1"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If strcomp(CurrentTestCaseName,TestScriptName)=0 Then
		strUsername = trim(DataTable.Value("UserName"))
		strPassword = trim(DataTable.Value("Password"))
		strURL = DataTable.Value("URL")
		intStoreId = DataTable.Value("StoreID")
		strAnotherStoreId = DataTable.Value("ChangeStoreID")
		strStoreName = DataTable.Value("StoreName")
		strChangeStoreName = DataTable.Value("ChangeStoreName")
		
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
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
'LoadFunctionLibrary DirPath&"\Automation\Function Library\Evolution.qfl"

Call LaunchEvolutionFromXstore()

 
wait (5)

'If Browser("Evolution").exist(2) Then
'	Browser("Evolution").Close	
'End If

'If Browser("Evolution").Exist(2) then
'	Reporter.ReportEvent micDone,"Login into Evolution","User has Already logged into Evolution"
'Else
	call EvolutionLoginBrowser(strUsername,strPassword,strURL,intStoreId,strAnotherStoreId,strStoreName,strChangeStoreName)
'	wait 1
'End If

wait 3

If Browser("Evolution").exist(2) Then
	Browser("Evolution").Close
End If

'Call Logout(strUsername,strPassword)


On Error GoTo 0
ExitRun 





Call fnSortBy("Best sellers")
Function fnSortBy(strSortOption)
	Browser("Browser").Page("Page").Frame("eposTab&&0Frame").WebButton("Sort by. Selected sort").Click
	Browser("Browser").Page("Page").Frame("eposTab&&0Frame").WebElement(strSortOption).Click
End Function


Call fnFilterBy("Total Device Cost","100","200")
Function fnFilterBy(strFilterOption, CostFrom, CostTo)
'	Browser("Browser").Page("Page").Frame("eposTab&&0Frame").WebButton("Expand Total Device Cost").Click
	Browser("Browser").Page("Page").Frame("eposTab&&0Frame").WebElement("FilterBy").Click
	If strFilterOption = "Total Device Cost" Then
		Browser("Browser").Page("Page").Frame("eposTab&&0Frame").WebElement(strFilterOption).Click
		Browser("Browser").Page("Page").Frame("eposTab&&0Frame").WebEdit("CostFrom").Set CostFrom
		Browser("Browser").Page("Page").Frame("eposTab&&0Frame").WebEdit("CostTo").Set CostTo
		Browser("Browser").Page("Page").Frame("eposTab&&0Frame").WebButton("Filter").Click

	End If
	
End Function

Browser("Browser").Page("Page").Frame("eposTab&&0Frame").WebElement("FILTER BY 0 filters applied").Click DataTable("UserName", dtGlobalSheet)

Browser("Browser").Page("Page").Frame("eposTab&&0Frame").WebElement("High to low").Click










'Dim array1 =  Array("January","February","March","April")
array1 = Array("Jan","Feb","Mar","Apr","Jan")


f = Filter(array1,"J")








JavaWindow("Oracle Retail Xstore Point").JavaButton("Evolution").Click



Repositoriescollection.Add "C:\OnStack_InStoreSales\Automation\ObjectRepository\FinalLocalRepo.tsr"
wait 5
Set obj = createobject("Wscript.shell")
wait 2
If Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame_7").WebElement("Amazon Prime Video").Exist(5) Then
	Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame_7").WebElement("Amazon Prime Video").HoverTap
		wait 2
	Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame_7").WebElement("innertext:=Amazon Prime.*","index:=1").Click
	wait 1
	Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame_7").WebElement("innertext:=Amazon Prime.*","index:=1").Click
End If

WAIT 2
obj.SendKeys "{TAB}"
WAIT 2
obj.SendKeys "{ENTER}"




