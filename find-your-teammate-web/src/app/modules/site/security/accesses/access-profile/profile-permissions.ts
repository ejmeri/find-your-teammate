import { AllowPermissions } from './allow-permissions';

export class ProfilePermissions {
  companies = ['Listar', 'Visualizar', 'Criar', 'Editar'];
  segments = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];
  sectors = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];
  departments = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];
  plannings = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];
  classes = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];
  exercises = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];

  planningSettingsEmphases = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];
  planningSettingsObjectives = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];
  planningSettingsRegions = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];
  planningSettingsJoints = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];
  planningSettingsMuscles = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];
  planningSettingsMaterials = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];

  collaborators = ['Listar', 'Visualizar', 'Criar', 'Editar'];
  companyPlannings = ['Listar', 'Visualizar', 'Alocar', 'Adicionar Turma'];
  companyTeams = ['Listar', 'Visualizar', 'Criar', 'Editar', 'Adicionar Colaborador', 'Remover Colaborador'];
  realizationClasses = [
    'Listar',
    'Visualizar',
    'Iniciar Aula',
    'Finalizar Aula',
    'Salvar Chamada',
    'Adicionar Colaborador na Chamada',
  ];

  companyQuestionnaires = ['Listar', 'Visualizar'];
  companyQuestionnaireAllocations = ['Listar', 'Visualizar', 'Editar', 'Visualizar Respostas da Atribuição'];
  companyQuestionnaireAnswers = ['Listar', 'Visualizar'];

  teachers = ['Criar', 'Editar', 'Listar', 'Visualizar'];
  employees = ['Criar', 'Editar', 'Listar', 'Visualizar'];
  employeesRoles = ['Criar', 'Editar', 'Inativar', 'Listar', 'Visualizar'];

  removes(allowPermissions: AllowPermissions) {
    if (allowPermissions == null || Object.entries(allowPermissions).length == 0) {
      return;
    }

    if (allowPermissions.companies) {
      allowPermissions.companies.forEach((permission) => {
        this.companies = this.companies.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.collaborators) {
      allowPermissions.collaborators.forEach((permission) => {
        this.collaborators = this.collaborators.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.companyPlannings) {
      allowPermissions.companyPlannings.forEach((permission) => {
        this.companyPlannings = this.companyPlannings.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.companyTeams) {
      allowPermissions.companyTeams.forEach((permission) => {
        this.companyTeams = this.companyTeams.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.realizationClasses) {
      allowPermissions.realizationClasses.forEach((permission) => {
        this.realizationClasses = this.realizationClasses.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.companyQuestionnaires) {
      allowPermissions.companyQuestionnaires.forEach((permission) => {
        this.companyQuestionnaires = this.companyQuestionnaires.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.companyQuestionnaireAnswers) {
      allowPermissions.companyQuestionnaireAnswers.forEach((permission) => {
        this.companyQuestionnaireAnswers = this.companyQuestionnaireAnswers.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.companyQuestionnaireAllocations) {
      allowPermissions.companyQuestionnaireAllocations.forEach((permission) => {
        this.companyQuestionnaireAllocations = this.companyQuestionnaireAnswers.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.teachers) {
      allowPermissions.teachers.forEach((permission) => {
        this.teachers = this.teachers.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.employees) {
      allowPermissions.employees.forEach((permission) => {
        this.employees = this.employees.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.employeesRoles) {
      allowPermissions.employeesRoles.forEach((permission) => {
        this.employeesRoles = this.employeesRoles.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.segments) {
      allowPermissions.segments.forEach((permission) => {
        this.segments = this.segments.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.sectors) {
      allowPermissions.sectors.forEach((permission) => {
        this.sectors = this.sectors.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.departments) {
      allowPermissions.departments.forEach((permission) => {
        this.departments = this.departments.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.segments) {
      allowPermissions.segments.forEach((permission) => {
        this.segments = this.segments.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.plannings) {
      allowPermissions.plannings.forEach((permission) => {
        this.plannings = this.plannings.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.classes) {
      allowPermissions.classes.forEach((permission) => {
        this.classes = this.classes.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.exercises) {
      allowPermissions.exercises.forEach((permission) => {
        this.exercises = this.exercises.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.planningSettingsEmphases) {
      allowPermissions.planningSettingsEmphases.forEach((permission) => {
        this.planningSettingsEmphases = this.planningSettingsEmphases.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.planningSettingsJoints) {
      allowPermissions.planningSettingsJoints.forEach((permission) => {
        this.planningSettingsJoints = this.planningSettingsJoints.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.planningSettingsMaterials) {
      allowPermissions.planningSettingsMaterials.forEach((permission) => {
        this.planningSettingsMaterials = this.planningSettingsMaterials.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.planningSettingsMuscles) {
      allowPermissions.planningSettingsMuscles.forEach((permission) => {
        this.planningSettingsMuscles = this.planningSettingsMuscles.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.planningSettingsObjectives) {
      allowPermissions.planningSettingsObjectives.forEach((permission) => {
        this.planningSettingsObjectives = this.planningSettingsObjectives.filter((e) => e !== permission);
      });
    }

    if (allowPermissions.planningSettingsRegions) {
      allowPermissions.planningSettingsRegions.forEach((permission) => {
        this.planningSettingsRegions = this.planningSettingsRegions.filter((e) => e !== permission);
      });
    }
  }
}
