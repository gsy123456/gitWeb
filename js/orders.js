window.onload = function(){
	window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	window.IDBCursor = window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor;
	var btnNew = document.getElementById("btnNew");
	var btnAdd = document.getElementById("btnAdd");
	var btnUpdate = document.getElementById("btnUpdate");
	var btnDelete = document.getElementById("btnDelete");
	var btnClear = document.getElementById("btnClear");
	var dbName = "MyData";
	var dbVersion = 20180318;
	var idb;
	var datatable;
	var data;

	var init = function(){		
		var dbConnet = indexedDB.open(dbName, dbVersion);
		dbConnet.onsuccess = function(e){
			idb = e.target.result;
			datatable = document.getElementById("dataTable");
			alert("数据库链接成功")
		}
		dbConnet.onerror = function(){
			alert("数据库连接失败");
		}
		dbConnet.onupgradeneeded = function(e){
			idb = e.target.result;
			if(!idb.objectStoreNames.contains("orders")){
				var tx = e.target.transaction;
				tx.oncomplete = function(){
					showAllData(true);
				};
				tx.onabort = function(){
					alert("对象仓库创建失败");
				};
				var name = "orders";
				var optionalParameters = {
					keyPath: "id",
					autoIncrement: true
				};
				var store = idb.createObjectStore(name, optionalParameters);
				alert("对象仓库创建成功");
				var name = "codeIndex";
				var KeyPath = "code";
				var optionalParameters = {
					unique: true,
					multiEntry: false
				};
				var idx = store.createIndex(name, KeyPath, optionalParameters);
				alert("索引创建成功");
			}
		}
	}

	var addData = function(){
		data = new Object();
		data.Code = document.getElementById("tbxCode").value;
		data.Date = document.getElementById("tbxDate").value;
		data.GoodsCode = document.getElementById("tbxGoodsCode").value;
		data.BrandName = document.getElementById("tbxBrandName").value;
		data.Num = document.getElementById("tbxNum").value;
		data.Price = document.getElementById("tbxPrice").value;
		data.Money = document.getElementById("tbxMoney").value;
		data.PersionName = document.getElementById("tbxPersonName").value;
		data.Email = document.getElementById("tbxEmail").value;
		var tx = idb.transaction("orders", "readwrite");
		var chErrorMsg = "";
		tx.oncomplete = function(e){
			if(chErrorMsg !==""){
				alert(chErrorMsg);
			}else{
				showAllData(false);
				alert("追加数据成功");
			}
		};
		tx.onabort = function(){
			alert("追加数据失败");
		};
		var store = tx.objectStore("orders");
		var idx = store.index("codeIndex");
		var range = IDBKeyRange.only(data.Code);
		var direction = "next";
		var req = idx.openCursor(range, direction);
		req.onsuccess = function(){
			var cursor = this.result;
			if(cursor){
				chErrorMsg = "输入的订单编号在数据库中以存在";
			}else{
				var value = {
					code: data.Code,
					date: data.Date,
					goodscode: data.GoodsCode,
					brandname: data.BrandName,
					num: data.Num,
					price: data.Price,
					persionname: data.PersionName,
					email: data.Email 
				}
				store.put(value);
			}
			console.log(store.get("7457305"))
		};
		req.onerror = function(){
			alert("追加数据失败");
		}
	}

	var showAllData = function(loadPage){
		// if(loadPage){
		// 	removeAllData();
		// }
		var tx = idb.transaction("orders", "readonly");
		var store = tx.objectStore("orders");
		var range = IDBKeyRange.lowerBound(1);
		var direction = "next";
		var req = store.openCursor(range, direction);
		var i=0;
		req.onsuccess =  function(){
			var cursor = this.result;
			if(cursor){
				i +=1;
				showData(cursor.value,i);
				cursor.continue();
			}
		};
		req.onerror = function(){
			alert("检索数据失败");
		}
	};

	var showData = function(row, i){
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		var td4 = document.createElement("td");
		var td5 = document.createElement("td");
		var td6 = document.createElement("td");
		var td7 = document.createElement("td");
		var td8 = document.createElement("td");
		var td9 = document.createElement("td");
		td1.innerHTML = row.code;
		td2.innerHTML = row.date;
		td3.innerHTML = row.goodscode;
		td4.innerHTML = row.brandname;
		td5.innerHTML = row.num;
		td6.innerHTML = row.price;
		td7.innerHTML = parseInt(row.num)*parseInt(row.price);
		td8.innerHTML = row.persionname;
		td9.innerHTML = row.email;
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);
		tr.appendChild(td7);
		tr.appendChild(td8);
		tr.appendChild(td9);
		datatable.appendChild(tr);
	}

	init();
	btnAdd.addEventListener("click", function(){addData()}, false);
};