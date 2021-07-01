'###################################################################################################################fi 0.5i^FI )
'Test Script Name: TC001_UserAccess_Sample
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:RAMESH
'Designed Date(MM/DD/YY): 11/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################

On Error Resume Next
    
DataFilePath = "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales.xls"
TestScriptName = "AO2_01_ISS_UAT_98"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If strcomp(CurrentTestCaseName,TestScriptName)=0 Then
		strUsername = trim(DataTable.Value("UserName"))
		strPassword = trim(DataTable.Value("Password"))
		strXstoreUsername = DataTable.Value("XstoreUserName")
		strXstorePassword = DataTable.Value("XstorePassword")
		LoginType= Datatable.Value("Login")
		strPLU= DataTable.Value("PLU")
		strIMEI= DataTable.Value("IMEI")
		strURL = DataTable.Value("URL")
		intStoreId = DataTable.Value("StoreID")
		intPLU = DataTable.Value("PLU")
		strAnotherStoreId = DataTable.Value("ChangeStoreID")
		strStoreName = DataTable.Value("StoreName")
		strChangeStoreName = DataTable.Value("ChangeStoreName")
		strDeviceName = DataTable.Value("DeviceName")
		strSimType = DataTable.Value("SimType")
		stremailID = DataTable.Value("email")
		strFirstName = DataTable.Value("FirstName")
		strLastName = DataTable.Value("LastName")
		dtDate = DataTable.Value("DOB")
		intMobileNumber = DataTable.Value("MobileNumber")
		intHouseNumber = DataTable.Value("HouseNo")
		intPostCode = DataTable.Value("PostCode")
		strJourney = DataTable.Value("Journey")
		intIMEI = DataTable.Value("IMEI")
		intSSN = DataTable.Value("SSN")
		strAccountName = DataTable.Value("AccountName")
		intAccountNumber = DataTable.Value("AccountNumber")
		intSortCode = DataTable.Value("SortCode")
		intCardNumber  = DataTable.Value("CardNumber")
		intCVV  = DataTable.Value("CVV")
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
Repositoriescollection.Add DirPath&"\ObjectRepository\Evolution_Ramesh.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\LocalRepo.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\InventoryManagement.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\FinalLocalRepo.tsr"
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctionsNCOwn.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"

'Required
Call LoginXstore(LoginType,strXstoreUsername,strXstorePassword)
Wait 2
Call CommonStockAdjustmentSellableForAccesseriory(strPLU,strIMEI,LoginType,strXstoreUsername,strXstorePassword)
Wait 2
Call LaunchEvolutionFromXstore()
wait 2
Call EvolutionLoginBrowser(strUsername,strPassword,strURL,intStoreId,strAnotherStoreId,strStoreName,strChangeStoreName)
Wait 2
Call LaunchNC()
wait 2
Call scanPLUSearch(intPLU)
Wait 2
'Call ScannedProductDetailsPage()
'Wait 3

'Not Required
'ProductTariffSelection this is not required
'Call ProductTariffSelection()
'Wait 3

'Required
Call ProductNavtoGoToBasketForAccessory()
Wait 2
Call ProductNavToCreateAccountPage()
Wait 2
Call ProductEnterEmailID(stremailID)
Wait 2
Call CustomerDetailsPage(strFirstName,strLastName,dtDate,intMobileNumber,intHouseNumber,intPostCode)
Wait 2
Call selectionIMEIorSSNoreSIM(strJourney,intIMEI,intSSN)
Wait 5
Call ReserveOrder()
Wait 5
Call ReserveOrderFinalContinueAccessory()
wait 5
'Not Required
'Call EligibilityCheck()
'Wait 5
'Call AdvisorSteps()
'Wait 5
'Call DirectDebitDetails(strAccountName,intAccountNumber,intSortCode)
'Wait 5
'Call CreditCheckAndCardDeails(strAccountName,intCardNumber,intCVV)
'Wait 5
'Call MoreOption()
'Wait 5
'Call Review()
'Wait 5
'
'Call Agreement()
'Wait 5
'Call FinishAccount()

Call SkipForNowLink()
wait 2
LoginType="Till"

Call LoginXstore(LoginType,strXstoreUsername,strXstorePassword)
wait 2
Call FinalCheck()
wait 2
Call FinalorderStatusValidation()

If Browser("Evolution").exist(2) Then
	Browser("Evolution").CloseAllTabs
End If
 @@ hightlight id_;_6162156_;_script infofile_;_ZIP::ssf1.xml_;_
Call Logout(strUsername,strPassword)

On Error GoTo 0
ExitRun 






'
'strScriptLoc="Local"
'TestScriptRootPath=Environment.Value("TestDir")
'spath=Split(TestScriptRootPath,"\")
'If strScriptLoc="Local" Then
'	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)
'Else
'	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)&"\"&spath(3)&"\"&spath(4)&"\"&spath(5)&"\"&spath(6)&"\"&spath(7)&"\"&spath(8)&"\"&spath(9)&"\"&spath(10)
'End If
'
''loading object repositories and library files
'Repositoriescollection.Add DirPath&"\ObjectRepository\Evolution.tsr"
'Repositoriescollection.Add DirPath&"\ObjectRepository\Steffy_NC.tsr"
'Repositoriescollection.Add DirPath&"\ObjectRepository\LocalRepo.tsr"
'Repositoriescollection.Add DirPath&"\ObjectRepository\InventoryManagement.tsr"
'Repositoriescollection.Add DirPath&"\ObjectRepository\FinalLocalRepo.tsr"
'LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
'LoadFunctionLibrary DirPath&"\FunctionLibrary\Evolution.qfl"
'LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"
'
'
'Call FinalorderStatusValidation()
'
'
'Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame").WebButton("Update transaction status").Click
'
