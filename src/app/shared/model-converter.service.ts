import { Injectable } from '@angular/core'
import { camelCase, snakeCase } from "lodash"
import { HabilModel } from '../model/habil.model'

@Injectable({
	providedIn: 'root'
})
export class ModelConverterService {

	constructor() { }

	toCamelCaseType<T>(type: (new (data) => T), snakeCaseModel: any): T {
		return new type(this.objectToCamelCase(snakeCaseModel))
	}

	toCamelCaseArrayType<T>(type: (new (data) => T), snakeCaseModel: any): T[] {

		const modelDataArray: T[] = []

		if (!Array.isArray(snakeCaseModel)) return

		snakeCaseModel.forEach(object => {
			modelDataArray.push(new type(this.objectToCamelCase(object)))
		})

		return modelDataArray

	}

	toSnakeCase(camelCaseModel: HabilModel): any {

		const snakeModel = {}

		if (!camelCaseModel) return

		for (const key of Object.keys(camelCaseModel)) {
			if (Array.isArray(camelCaseModel[key])) {
				const array = []
				for (const item of camelCaseModel[key]) {
					switch (typeof item) {
						case 'string':
							array.push(item)
							break
						case 'number':
							array.push(item)
							break
						default:
							array.push(this.toSnakeCase(item))
					}
				}
				snakeModel[snakeCase(key)] = array
			} else {
				snakeModel[snakeCase(key)] = (!!camelCaseModel[key] && typeof camelCaseModel[key] === 'object' && !(camelCaseModel[key] instanceof Date)) ? this.toSnakeCase(camelCaseModel[key]) : camelCaseModel[key]
			}
		}
		return snakeModel
	}

	objectToCamelCase(snakeCaseModel: any): any {

		const modelData: any = {}

		if (!snakeCaseModel) return

		for (const key of Object.keys(snakeCaseModel)) {
			if (Array.isArray(snakeCaseModel[key])) {
				const array = []
				for (const item of snakeCaseModel[key]) {
					switch (typeof item) {
						case 'string':
							array.push(item)
							break
						case 'number':
							array.push(item)
							break
						default:
							array.push(this.objectToCamelCase(item))
					}
				}
				modelData[camelCase(key)] = array
			} else {
				modelData[camelCase(key)] = (!!snakeCaseModel[key] && typeof (snakeCaseModel[key]) === 'object') ? this.objectToCamelCase(snakeCaseModel[key]) : snakeCaseModel[key]
			}

		}

		return modelData

	}


	toCamelCase(snakeCaseModel: any): any {
		
		const modelData: any[] = []

		if (!snakeCaseModel) return

		if (Array.isArray(snakeCaseModel)){
			snakeCaseModel.forEach(object => {
				modelData.push(this.objectToCamelCase(object))
			})
			return modelData
		}else{
			return this.objectToCamelCase(snakeCaseModel)
		}	
	}

}
