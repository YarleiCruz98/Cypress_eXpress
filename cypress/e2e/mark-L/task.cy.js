/// <reference types="cypress" />

describe('tarefas', ()=> {

    let testData;

    before( ()=> {
        cy.fixture('task').then(t => {
            testData = t
        })
    }) 

    context('cadastro', ()=> {

        it('deve cadastrar uma nova tarefas', ()=> {

            const taskName = 'Ler um livro de node js'
    
            cy.deleteTask(taskName)
            cy.createTask(taskName)
    
            cy.contains('main div p',taskName)
                .should('be.visible')
    
        })
    
        it('não deve permitir tarefa duplicada', ()=>{
            
            const task = testData.dup
    
            cy.deleteTask(task.name)
            cy.postTask(task)
            cy.createTask(task.name)
    
            cy.get('.swal2-title')
                .should('be.visible')
                .should('have.text', 'Oops')
    
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
    
        })
    
        it('campo obrigatório', ()=>{
    
            cy.createTask()
            cy.isRequired('This is a required field')
    
        })

    })

    context('atualização', () => {

        it('deve concluir uma tarefa', ()=>{

            const task = testData.python

            cy.deleteTask(task.name)
            
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')

        })

    })

    context('exclusão', () => {

        it('deve deletar uma tarefa não concluída', ()=>{
            
            const task = testData.selenium

            cy.deleteTask(task.name)
            
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')  

        })

        it('deve remover uma tarefa concluída', ()=>{
            
            const task = testData.appium

            cy.deleteTask(task.name)
            
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()
            
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')

        })

    })

})
