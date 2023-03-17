const express = require('express')
const openai = require('../config/openai')
const InputModel = require('../model/input-prompt')

require("dotenv").config()

module.exports = {
    async sendText(req, res) {
        const openAi = openai.configuration()
        const inputModel = new InputModel(req.body)

        try {
            const response = await openAi.createCompletion(
                openai.textCompletion(inputModel)
            )

            return res.status(200).json({
                sucess: true,
                data: response.data.choices[0].text
            })
        } catch (error) {

            return response.status(400).json({
                sucess: false,
                error: error.response ?
                    error.response.data
                    : 'Server error'
            })
        }
    }
}