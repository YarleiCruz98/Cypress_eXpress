/// <reference types="cypress" />

describe('tarefas', ()=> {

    context('cadastro', ()=> {

        it('deve cadastrar uma nova tarefas', ()=> {

            const taskName = 'Ler um livro de node js'
    
            cy.deleteTask(taskName)
            cy.createTask(taskName)
    
            cy.contains('main div p',taskName)
                .should('be.visible')
    
        })
    
        it('não deve permitir tarefa duplicada', ()=>{
            
            const task = {
                name: 'Estudar Javascript',
                is_done: false
            }
    
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

            const task = {
                name: 'Estudar Python',
                is_done: false
            }

            cy.deleteTask(task.name)
            
            cy.postTask(task)

            cy.visit('http://localhost:8080/')

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
            
            const task = {
                name: 'Estudar Selenium',
                is_done: false
            }

            cy.deleteTask(task.name)
            
            cy.postTask(task)

            cy.visit('http://localhost:8080/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')  

        })

        it('deve remover uma tarefa concluída', ()=>{
            
            const task = {
                name: 'Estudar Appium',
                is_done: false
            }

            cy.deleteTask(task.name)
            
            cy.postTask(task)

            cy.visit('http://localhost:8080/')

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
