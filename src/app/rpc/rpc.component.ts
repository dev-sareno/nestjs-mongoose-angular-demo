import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { tap } from "rxjs/operators";
import rpc_pb from "src/app/protobuf/commonjs/rpc_pb";
const rpcPb = rpc_pb as any;

@Component({
  selector: 'app-rpc',
  templateUrl: './rpc.component.html',
  styleUrls: ['./rpc.component.scss']
})
export class RpcComponent implements OnInit {

  limit = 100;
  returnType = 'json';

  constructor(
    protected readonly apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.returnType === 'blob') {
      this.apiService.getRpcDataBlob(this.limit, this.returnType)
        .pipe(
          tap(async (res: ArrayBuffer) => {
            const blob = new Uint8Array(res);
            const decode = rpcPb.RpcResponse.deserializeBinary(blob).toObject();
            console.log(decode)
          })
        )
        .subscribe();
    } else {
      this.apiService.getRpcDataJson(this.limit, this.returnType)
        .pipe(
          tap(async (res: any) => {
            console.log(res)
          })
        )
        .subscribe();
    }
  }
}
