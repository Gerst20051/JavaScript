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

	this.output.push(html.join(''));
};

ResumeBuilder.prototype.addSkillsModule = function(){
	var html = [];
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
	$(this.selector).append(function(){
		return _this.output.join('');
	});
};
