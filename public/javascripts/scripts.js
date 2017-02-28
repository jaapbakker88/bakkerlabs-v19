document.querySelector('.happy-2').addEventListener('mouseover', function() {
	document.querySelector('.description').classList.remove('description1');
	document.querySelector('.description').classList.remove('description3');
	document.querySelector('.description').classList.add('description2');
	document.querySelector('.one').style.display = 'none';
	document.querySelector('.three').style.display = 'none';
	document.querySelector('.two').style.display = 'block';

});

document.querySelector('.happy-1').addEventListener('mouseover', function() {
	document.querySelector('.description').classList.remove('description2');
	document.querySelector('.description').classList.remove('description3');
	document.querySelector('.description').classList.add('description1');
	document.querySelector('.two').style.display = 'none';
	document.querySelector('.three').style.display = 'none';
	document.querySelector('.one').style.display = 'block';
});

document.querySelector('.happy-3').addEventListener('mouseover', function() {
	document.querySelector('.description').classList.remove('description1');
	document.querySelector('.description').classList.remove('description2');
	document.querySelector('.description').classList.add('description3');
	document.querySelector('.one').style.display = 'none';
	document.querySelector('.two').style.display = 'none';
	document.querySelector('.three').style.display = 'block';
});