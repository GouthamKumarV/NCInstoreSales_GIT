'##################################################################################################################
'Test Script Name: TC001_UserAccess_Sample
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:RAMESH
'Designed Date(MM/DD/YY): 11/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################

On Error Resume Next
    
DataFilePath = "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales.xls"
TestScriptName ="AO2_01_ISS_UAT_32"

DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If StrComp(CurrentTestCaseName,TestScriptName)=0 Then
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
		strePassword = DataTable.Value("Password")
		strSecurityAnswer = DataTable.Value("SecurityAnswer")
		
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
Repositoriescollection.Add DirPath&"\ObjectRepository\Evolution_NC.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\NC_CSRD.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\InventoryManagement.tsr"
'Repositoriescollection.Add DirPath&"\ObjectRepository\MasterRepository.tsr"
'LoadFunctionLibrary DirPath&"\FunctionLibrary\Evolution.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctionsAsh.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\NC_CSRD_CommonFunctions.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctionsNCOwn.qfl"

wait 3
Call LoginXstore(LoginType,strXstoreUsername,strXstorePassword)
Wait 2
Call CommonStockAdjustmentSellable(strPLU,strIMEI,LoginType,strXstoreUsername,strXstorePassword)
Wait 2
Call LaunchEvolutionFromXstore() 
wait 5
Call EvolutionLoginBrowser(strUsername,strPassword,strURL,intStoreId,strAnotherStoreId,strStoreName,strChangeStoreName)
Wait 2
Call LaunchNC()
wait 2
Call scanPLUSearch(intPLU)
Wait 2
Call ScannedProductDetailsPage()
Wait 2
Call ProductTariffSelection()
Wait 2
Call ProductNavtoGoToBasket()
Wait 2
'Call Discount_Apply()
Wait 5
Call ProductNavToCreateAccountPage()
Wait 4
Call ProductEnterEmailID(stremailID)
Wait 5
Call CustomerDetailsPage(strFirstName,strLastName,dtDate,intMobileNumber,intHouseNumber,intPostCode)
Wait 5
Call selectionIMEIorSSNoreSIM(strJourney,intIMEI,intSSN)
Wait 2
Call ReserveOrderContinueAnother()
'Wait 2
'Call ReserveOrder()
Wait 5
Call EligibilityCheck()
Wait 5
Call AdvisorSteps()
Wait 5
Call DirectDebitDetails(strAccountName,intAccountNumber,intSortCode)
Wait 5
Call CreditCheckAndCardDeails(strAccountName,intCardNumber,intCVV)
Wait 5
Call MoreOption()
Wait 5
Call ReviewDetails()
Wait 5
Call  AgreementDetails()
Wait 5
Call FinishAccountSetup(strePassword,strSecurityAnswer)
Wait 5
Call EvolutionClose()
Wait 5
Call LoginXstore("Till",strXstoreUsername,strXstorePassword)
Wait 5
Call NC_Xstore_Validation()
Wait 5
Call LaunchEvolutionFromXstore() 
wait 5
Call EvolutionLoginBrowser(strUsername,strPassword,strURL,intStoreId,strAnotherStoreId,strStoreName,strChangeStoreName)
Wait 2
Call LaunchNC()
Wait 2
Call NC_SearchOrder(stremailID)
Wait 2
Call EntersecurityAnswer(strSecurityAnswer)
Wait 2
Call AccountPage()
Wait 2
Call CancelOrder_AfterPayment()
Wait 2
Call EvolutionClose()
'Call Logout(strUsername,strPassword)
On Error GoTo 0
ExitRun



