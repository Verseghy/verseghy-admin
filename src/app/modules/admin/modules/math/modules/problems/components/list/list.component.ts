import { Component, OnInit } from '@angular/core'
import {
  IconService,
  ModalService,
  TableHeaderItem,
  TableItem,
  TableModel,
  TableRow,
} from 'carbon-components-angular'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TrashCan16 } from '@carbon/icons'
import { map } from 'rxjs'
import { ProblemService } from '../../services/problem.service'
import { AddEditComponent, ModalType } from "../add-edit/add-edit.component";

const headers = [
  new TableHeaderItem({ data: $localize`ID` }),
  new TableHeaderItem({ data: $localize`Body` }),
]

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  emptyTableModel = new TableModel()
  model$ = this.problemService.entities$.pipe(
    map((problems) => {
      const model = new TableModel()
      model.header = headers
      let data: TableRow[] = []
      for (const problem of problems) {
        data = [
          ...data,
          new TableRow(
            new TableItem({ data: problem.id }),
            new TableItem({ data: problem.body })
          ),
        ]
      }
      model.data = data
      return model
    })
  )

  constructor(
    private problemService: ProblemService,
    private iconService: IconService,
    private modalService: ModalService
  ) {
    this.iconService.registerAll([TrashCan16])
  }

  ngOnInit() {
    this.problemService.getAll()
    this.addButton() // TODO: remove this
  }

  addButton() {
    this.modalService.create({
      component: AddEditComponent,
      inputs: {
        type: ModalType.ModalTypeEdit,
        editID: "1ab4dabc-2661-4948-9833-68fe3a411aec",
      },
    })
  }
}
