/*
 *********************************************
 *** ResumeBuilder created by Andrew Gerst ***
 *********************************************
 */

var ResumeBuilder = function(){
	this.data = {};
	this.selector = "";
	this.modules = [];
	this.output = [];
	this.moduleAliases = {
		"title": this.addTitleModule,
		"skills": this.addSkillsModule,
		"experience": this.addExperienceModule,
		"education": this.addEducationModule,
		"projects": this.addProjectsModule
	};

	this.config = function(selector){
		this.selector = selector;
		return this;
	};

	this.run = function(){
		this.parseData();
		this.addModules();
		this.printResume();
	};
};

ResumeBuilder.prototype.parseData = function(){
	var data = this.data;

	//TODO: Extract this info directly from this.data using Object.keys?
	if (data.name || data.title || data.location || data.number || data.email || data.url || data.statement) {
		this.modules.push('title');
	}
	if (data.skills.length) {
		this.modules.push('skills');
	}
	if (data.experience.length) {
		this.modules.push('experience');
	}
	if (data.education.length) {
		this.modules.push('education');
	}
	if (data.projects.length) {
		this.modules.push('projects');
	}
};

ResumeBuilder.prototype.addModules = function(){
	for (var i = 0; i < this.modules.length; i++) {
		this.moduleAliases[this.modules[i]].call(this);
	}
};

ResumeBuilder.prototype.setData = function(data){
	this.data = data;
	return this;
};

ResumeBuilder.prototype.updateData = function(data){
	this.data = data;
	this.run();
};

ResumeBuilder.prototype.createModule = function(){

};

ResumeBuilder.prototype.addTitleModule = function(){
	var html = [];
	html.push('<div id="titleModule" class="resumemodule">');
	html.push('<div id="nametitle">');
	html.push('<div id="name">Andrew Anthony Gerst</div>');
	html.push('<div id="title">JavaScript Engineer</div>');
	html.push('</div>');
	html.push('<div id="contact">');
	html.push('<div>Chapel Hill, NC, United States</div>');
	html.push('<div>9198851642</div>');
	html.push('<div>gerst20051@gmail.com</div>');
	html.push('<div>http://about.me/agerst</div>');
	html.push('</div>');
	html.push('<div id="statement" class="clear">');
	html.push('I\'m seeking a Web Development position where I can join and collaboratively work with a team and/or independently to build quality web applications or games. I\'ve been a Web Developer since 2005. I started because I wanted a central database accessible from anywhere on the internet of everything I owned. Mainly I wanted to document my games and have cheats for all of my games on my website I named Homenet. Homenet Spaces (HnS) was my first social network my spin on MySpace. I\'ve always seen ways to improve the way we interact with our friends and family. I really want to use my skills to impact the world in life-changing ways. Another passion I have is listening to music so I\'ve created multiple tools that offer different music listening experiences. Click for my book JavaScript Mastery.');
	html.push('</div>');
	html.push('</div>');
	this.output.push(html.join(''));
};

ResumeBuilder.prototype.addSkillsModule = function(){
	var html = [];
	html.push('<div id="skillsModule" class="resumemodule">');
	html.push('<div class="leftcol"><div>Skills</div></div>');
	html.push('<div class="rightcol"><b>Like: </b>');
	html.push(this.data.skills.join(', '));
	html.push('</div>');
	html.push('</div>');
	this.output.push(html.join(''));
};

ResumeBuilder.prototype.addExperienceModule = function(){
	var html = [];
	this.output.push(html.join(''));
};

ResumeBuilder.prototype.addEducationModule = function(){
	var html = [];
	this.output.push(html.join(''));
};

ResumeBuilder.prototype.addProjectsModule = function(){
	var html = [];
	this.output.push(html.join(''));
};

ResumeBuilder.prototype.printResume = function(){
	_this = this;
	$(this.selector).html(function(){
		return _this.output.join('');
	});
};
