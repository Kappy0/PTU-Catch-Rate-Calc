// JavaScript Document

function calc()
{
	//Initialize vars
	
	//Catch Rate always starts at 100
	var catchrate = 100;
	
	//Initialize vars that will be assigned from the form
	var level;
	var maxHP, curHP;
	var evo, shiny, legend;
	var numInjuries;
	var numVolatile, numPersistent;
	var stuck, slow;
	
	
	
	document.getElementById("catchrate").innerHTML = "TEXT WILL GO HERE!";
}

function addLoadEvent(funct)
{
	var oldOnLoad = window.onload;
	
	if(typeof window.onload != "function")
	{
		window.onload = funct;
	}
	else
	{
		window.onload = function()
		{
			oldOnLoad();
			funct();
		}
	}
}

function getDataTables()
{
	if(!document.getElementsByTagName)
	{
		return false;
	}
	
	var tables = document.getElementsByTagName("table");
	
	for(var i = 0; i < tables.length; i++)
	{
		if(tables[i].className === "calctable")
		{
			stripes(tables[i]);
		}
	}
}

function stripes(table)
{
	var tableRows = table.getElementsByTagName("tr");
	
	for(var i = 0; i < tableRows.length; i++)
	{
		if((i % 2) !== 0)
		{
			tableRows[i].className = "trlight";
		}
	}
}

addLoadEvent(getDataTables);